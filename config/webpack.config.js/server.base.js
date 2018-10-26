const path = require('path');
const nodeExternals = require('webpack-node-externals');

const paths = require('../paths');
const { server: serverLoaders } = require('./loaders');
const resolvers = require('./resolvers');
const plugins = require('./plugins');

module.exports = {
    name: 'server',
    target: 'node',
    entry: {
        server: [require.resolve('@babel/polyfill'), path.resolve(paths.srcServer, 'index.js')],
    },
    externals: [
        nodeExternals({
            // we still want imported css from external files to be bundled otherwise 3rd party packages
            // which require us to include their own css would not work properly
            whitelist: /\.css$/,
        }),
    ],
    output: {
        path: paths.serverBuild,
        filename: 'server.js',
        publicPath: paths.publicPath,
        // libraryTarget: 'commonjs2',
    },
    resolve: { ...resolvers },
    module: {
        rules: serverLoaders,
    },
    plugins: [...plugins.shared, ...plugins.server],
    stats: {
        colors: true,
    },
};
