const path = require('path');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const paths = require('../paths');
const { client: clientLoaders } = require('./loaders');
const resolvers = require('./resolvers');
const plugins = require('./plugins');

module.exports = {
    name: 'client',
    target: 'web',
    entry: {
        bundle: [require.resolve('@babel/polyfill'), `${paths.srcClient}/index.js`],
    },
    output: {
        path: path.join(paths.clientBuild, paths.publicPath),
        filename: 'bundle.js',
        publicPath: paths.publicPath,
        chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    module: {
        rules: clientLoaders,
    },
    resolve: { ...resolvers },
    resolveLoader: {
        plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    plugins: [...plugins.shared, ...plugins.client],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    optimization: {
        namedModules: true,
        noEmitOnErrors: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    stats: {
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        timings: true,
        version: false,
    },
};
