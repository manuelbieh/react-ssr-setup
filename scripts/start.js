const webpack = require('webpack');
const nodemon = require('nodemon');
const rimraf = require('rimraf');
const webpackConfig = require('../config/webpack.config.js')(process.env.NODE_ENV || 'development');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const paths = require('../config/paths');
const { logMessage, compilerPromise } = require('./utils');

const app = express();

const WEBPACK_PORT =
    process.env.WEBPACK_PORT ||
    (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501);

const start = async () => {
    rimraf.sync(paths.clientBuild);
    rimraf.sync(paths.serverBuild);

    const [clientConfig, serverConfig] = webpackConfig;
    clientConfig.entry.bundle = [
        `webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`,
        ...clientConfig.entry.bundle,
    ];

    clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
    clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

    const publicPath = clientConfig.output.publicPath;

    clientConfig.output.publicPath = [`http://localhost:${WEBPACK_PORT}`, publicPath]
        .join('/')
        .replace(/([^:+])\/+/g, '$1/');

    serverConfig.output.publicPath = [`http://localhost:${WEBPACK_PORT}`, publicPath]
        .join('/')
        .replace(/([^:+])\/+/g, '$1/');

    const multiCompiler = webpack([clientConfig, serverConfig]);

    const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client');
    const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');

    const clientPromise = compilerPromise('client', clientCompiler);
    const serverPromise = compilerPromise('server', serverCompiler);

    const watchOptions = {
        // poll: true,
        ignored: /node_modules/,
        stats: clientConfig.stats,
    };

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        return next();
    });

    app.use(
        webpackDevMiddleware(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            stats: clientConfig.stats,
            watchOptions,
        })
    );

    app.use(webpackHotMiddleware(clientCompiler));

    app.use('/static', express.static(paths.clientBuild));

    app.listen(WEBPACK_PORT);

    serverCompiler.watch(watchOptions, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(serverConfig.stats));
            return;
        }

        if (error) {
            logMessage(error, 'error');
        }

        if (stats.hasErrors()) {
            const info = stats.toJson();
            const errors = info.errors[0].split('\n');
            logMessage(errors[0], 'error');
            logMessage(errors[1], 'error');
            logMessage(errors[2], 'error');
        }
    });

    // wait until client and server is compiled
    try {
        await serverPromise;
        await clientPromise;
    } catch (error) {
        logMessage(error, 'error');
    }

    const script = nodemon({
        script: `${paths.serverBuild}/server.js`,
        ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
    });

    script.on('restart', () => {
        logMessage('Server side app has been restarted.', 'warning');
    });

    script.on('quit', () => {
        console.log('Process ended');
        process.exit();
    });

    script.on('error', () => {
        logMessage('An error occured. Exiting', 'error');
        process.exit(1);
    });
};

start();
