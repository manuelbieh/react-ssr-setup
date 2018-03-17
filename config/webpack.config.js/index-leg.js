const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const browserConfig = {
    entry: path.resolve(__dirname, '../../src/client/index.js'),
    output: {
        path: path.resolve(__dirname, '../../build/client'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [{ test: /\.(js)$/, use: 'babel-loader' }],
    },
    plugins: [
        new webpack.DefinePlugin({
            isClient: 'true',
        }),
    ],
};

const serverConfig = {
    entry: path.resolve(__dirname, '../../src/server/index.js'),
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, '../../build/server'),
        filename: 'server.js',
        publicPath: '/',
    },
    module: {
        rules: [{ test: /\.(js)$/, use: 'babel-loader' }],
    },
    plugins: [
        new webpack.DefinePlugin({
            isClient: 'false',
        }),
    ],
};

module.exports = [browserConfig, serverConfig];
