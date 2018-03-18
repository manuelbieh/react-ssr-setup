const webpack = require('webpack');
const nodemon = require('nodemon');
const chalk = require('chalk');
const webpackConfig = require('../config/webpack.config.js')('development');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const paths = require('../config/paths');

const app = express();

const WEBPACK_PORT =
    process.env.WEBPACK_PORT ||
    (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501);

const compilerPromise = (compiler) => {
    return new Promise((resolve, reject) => {
        compiler.plugin('done', (stats) => {
            if (!stats.hasErrors()) {
                return resolve();
            }
            return reject('Compilation failed');
        });
    });
};

const watchOptions = {
    // poll: true,
    ignored: /node_modules/,
};

const start = async () => {
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

    const multiCompiler = webpack([clientConfig, serverConfig]);

    const clientCompiler = multiCompiler.compilers[0];
    const serverCompiler = multiCompiler.compilers[1];

    const clientPromise = compilerPromise(clientCompiler);
    const serverPromise = compilerPromise(serverCompiler);

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        return next();
    });

    app.use(
        webpackDevMiddleware(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            watchOptions,
        })
    );

    app.use(webpackHotMiddleware(clientCompiler));

    app.listen(WEBPACK_PORT);

    serverCompiler.watch(watchOptions, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString({ colors: true }));
            return;
        }
        console.error(error);
    });

    // wait until client and server is compiled
    await serverPromise;
    await clientPromise;

    app.use('/static', express.static(paths.clientBuild));

    const script = nodemon({
        script: `${paths.serverBuild}/server.js`,
        ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
    });

    script.on('restart', () => {
        console.log(
            `[${new Date().toISOString()}]`,
            chalk.yellow('Server side app has been restarted.')
        );
    });
};

start();
