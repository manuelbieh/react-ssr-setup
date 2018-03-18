const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.js')('development');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const app = express();

const [clientConfig, serverConfig] = webpackConfig;
clientConfig.entry.bundle = [
    'webpack-hot-middleware/client?path=http://localhost:3005/__webpack_hmr',
    // 'webpack-hot-middleware/client',
    ...clientConfig.entry.bundle,
];

const multiCompiler = webpack([clientConfig, serverConfig]);
// const multiCompiler = webpack(webpackConfig);
// const clientCompiler = multiCompiler.compilers[0];

app.use(
    webpackDevMiddleware(multiCompiler, {
        publicPath: 'http://localhost:3005/static/',
    })
);

app.use(webpackHotMiddleware(multiCompiler));

app.listen(3005);

// const compilerPromise = (compiler) => {
//     return new Promise((resolve, reject) => {
//         compiler.plugin('done', (stats) => {
//             if (!stats.hasErrors()) {
//                 return resolve();
//             }
//             return reject('Compilation failed');
//         });
//     });
// };
//
// const start = () => {
//     const multiCompiler = webpack(webpackConfig);
// };

// function createCompilationPromise(name, compiler, config) {
//   return new Promise((resolve, reject) => {
//     let timeStart = new Date();
//     compiler.plugin('compile', () => {
//       timeStart = new Date();
//       console.info(`[${format(timeStart)}] Compiling '${name}'...`);
//     });
//     compiler.plugin('done', stats => {
//       console.info(stats.toString(config.stats));
//       const timeEnd = new Date();
//       const time = timeEnd.getTime() - timeStart.getTime();
//       if (stats.hasErrors()) {
//         console.info(
//           `[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`,
//         );
//         reject(new Error('Compilation failed!'));
//       } else {
//         console.info(
//           `[${format(
//             timeEnd,
//           )}] Finished '${name}' compilation after ${time} ms`,
//         );
//         resolve(stats);
//       }
//     });
//   });
// }
