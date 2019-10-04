import webpack from 'webpack';
import express from 'express';
import chalk from 'chalk';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import getConfig from '../config/webpack.config.ts';
import paths from '../config/paths';
import { logMessage, compilerPromise } from './utils';

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const app = express();

const PORT = process.env.PORT || 8500;

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost';

const start = async () => {
    const [clientConfig] = webpackConfig;
    clientConfig.entry.bundle = [
        `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${PORT}/__webpack_hmr`,
        ...clientConfig.entry.bundle,
    ];

    clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
    clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

    const webpackCompiler = webpack([clientConfig]);
    const clientCompiler = webpackCompiler.compilers.find((compiler) => compiler.name === 'client');
    const clientPromise = compilerPromise('client', clientCompiler);

    const watchOptions = {
        ignored: /node_modules/,
        stats: clientConfig.stats,
    };

    app.use((_req, res, next) => {
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

    app.use('*', express.static(paths.clientBuild));

    try {
        await clientPromise;

        app.listen(PORT, () => {
            console.log(
                `[${new Date().toISOString()}]`,
                chalk.blue(
                    `App is running: ${process.env.HOST || 'http://localhost'}:${process.env.PORT ||
                        8500}`
                )
            );
        });
    } catch (error) {
        logMessage(error, 'error');
    }
};

start();
