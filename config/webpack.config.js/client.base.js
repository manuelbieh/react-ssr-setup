const path = require('path');
const paths = require('../paths');
const { client: clientLoaders } = require('./loaders');
const resolvers = require('./resolvers');
const plugins = require('./plugins');

module.exports = {
    name: 'client',
    target: 'web',
    entry: {
        bundle: ['babel-polyfill', path.resolve(__dirname, '../../src/client/index.js')],
    },
    output: {
        path: paths.clientBuild,
        filename: 'bundle.js',
        publicPath: paths.publicPath,
    },
    module: {
        rules: clientLoaders,
    },
    resolve: resolvers,
    plugins: [...plugins.shared, ...plugins.client],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    optimization: {
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
};
