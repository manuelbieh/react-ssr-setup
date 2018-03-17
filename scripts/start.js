const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../config/webpack.config.js')('development');

// https://webpack.js.org/configuration/watch/#watchoptions
const watchOptions = {
    // Watching may not work with NFS and machines in VirtualBox
    // Uncomment next line if it is your case (use true or interval in milliseconds)
    // poll: true,
    // Decrease CPU or memory usage in some file systems
    // ignored: /node_modules/,
};

const format = (time) => time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');

const createCompilationPromise = (name, compiler, config) => {
    return new Promise((resolve, reject) => {
        let timeStart = new Date();
        compiler.plugin('compile', () => {
            timeStart = new Date();
            console.info(`[${format(timeStart)}] Compiling '${name}'...`);
        });
        compiler.plugin('done', (stats) => {
            console.info(stats.toString(config.stats));
            const timeEnd = new Date();
            const time = timeEnd.getTime() - timeStart.getTime();
            if (stats.hasErrors()) {
                console.info(`[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`);
                reject(new Error('Compilation failed!'));
            } else {
                console.info(
                    `[${format(timeEnd)}] Finished '${name}' compilation after ${time} ms`
                );
                resolve(stats);
            }
        });
    });
};

let server;

const start = async () => {
    if (server) return server;
    server = express();
    // server.use(errorOverlayMiddleware());
    server.use(express.static(path.resolve(__dirname, '../build/client')));

    const [clientConfig, serverConfig] = webpackConfig;

    clientConfig.entry.bundle = ['webpack-hot-middleware/client?name=client']
        .concat(clientConfig.entry.bundle)
        .sort((a, b) => b.includes('polyfill') - a.includes('polyfill'));
    clientConfig.output.filename = clientConfig.output.filename.replace('chunkhash', 'hash');
    clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace(
        'chunkhash',
        'hash'
    );

    serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
    serverConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';
    serverConfig.module.rules = serverConfig.module.rules.filter((x) => x.loader !== 'null-loader');

    const multiCompiler = webpack(webpackConfig);
    const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client');
    const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');
    const clientPromise = createCompilationPromise('client', clientCompiler, clientConfig);
    const serverPromise = createCompilationPromise('server', serverCompiler, serverConfig);

    // https://github.com/webpack/webpack-dev-middleware
    server.use(
        webpackDevMiddleware(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            logLevel: 'silent',
            watchOptions,
        })
    );

    // https://github.com/glenjamin/webpack-hot-middleware
    server.use(webpackHotMiddleware(clientCompiler, { log: false }));

    let appPromise;
    let appPromiseResolve;
    let appPromiseIsResolved = true;
    serverCompiler.plugin('compile', () => {
        if (!appPromiseIsResolved) return;
        appPromiseIsResolved = false;
        appPromise = new Promise((resolve) => (appPromiseResolve = resolve));
    });

    let app;
    server.use((req, res) => {
        appPromise.then(() => app.handle(req, res)).catch((error) => console.error(error));
    });

    const checkForUpdate = (fromUpdate) => {
        const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
        if (!app.hot) {
            throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
        }
        if (app.hot.status() !== 'idle') {
            return Promise.resolve();
        }
        return app.hot
            .check(true)
            .then((updatedModules) => {
                if (!updatedModules) {
                    if (fromUpdate) {
                        console.info(`${hmrPrefix}Update applied.`);
                    }
                    return;
                }
                if (updatedModules.length === 0) {
                    console.info(`${hmrPrefix}Nothing hot updated.`);
                } else {
                    console.info(`${hmrPrefix}Updated modules:`);
                    updatedModules.forEach((moduleId) =>
                        console.info(`${hmrPrefix} - ${moduleId}`)
                    );
                    checkForUpdate(true);
                }
            })
            .catch((error) => {
                if (['abort', 'fail'].includes(app.hot.status())) {
                    console.warn(`${hmrPrefix}Cannot apply update.`);
                    delete require.cache[require.resolve('../build/server')];
                    app = require(`${serverConfig.output.path}/server.js`).default;
                    // app = require('../build/server').default;
                    console.warn(`${hmrPrefix}App has been reloaded.`);
                } else {
                    console.warn(`${hmrPrefix}Update failed: ${error.stack || error.message}`);
                }
            });
    };

    serverCompiler.watch(watchOptions, (error, stats) => {
        if (app && !error && !stats.hasErrors()) {
            checkForUpdate().then(() => {
                appPromiseIsResolved = true;
                appPromiseResolve();
            });
        }
    });

    // Wait until both client-side and server-side bundles are ready
    await clientPromise;
    await serverPromise;

    const timeStart = new Date();
    console.info(`[${format(timeStart)}] Launching server...`);

    // Load compiled src/server.js as a middleware
    // eslint-disable-next-line global-require, import/no-unresolved
    app = require(`${serverConfig.output.path}/server.js`).default;
    appPromiseIsResolved = true;
    appPromiseResolve();

    const timeEnd = new Date();
    const time = timeEnd.getTime() - timeStart.getTime();
    console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);
    return server;
};

module.exports = start;

start();
