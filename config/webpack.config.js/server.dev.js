const baseConfig = require('./server.base');
const webpack = require('webpack');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const config = {
    ...baseConfig,
    plugins: [
        new WriteFileWebpackPlugin(),
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
    ],
    mode: 'development',
    performance: {
        hints: false,
    },
};

module.exports = config;
