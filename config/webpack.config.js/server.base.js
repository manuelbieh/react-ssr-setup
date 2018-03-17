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
        server: ['@babel/polyfill', path.resolve(__dirname, '../../src/server/index.js')],
    },
    externals: [nodeExternals()],
    output: {
        path: paths.serverBuild,
        filename: 'server.js',
        publicPath: paths.publicPath,
    },
    resolve: resolvers,
    module: {
        rules: serverLoaders,
    },
    plugins: [...plugins.shared, ...plugins.server],
};
