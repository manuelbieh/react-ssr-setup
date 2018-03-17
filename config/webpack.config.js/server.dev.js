const baseConfig = require('./server.base');
// const webpack = require('webpack');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const config = {
    ...baseConfig,
    plugins: [
        ...baseConfig.plugins,
        new WriteFileWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
    ],
    mode: 'development',
    performance: {
        hints: false,
    },
};

module.exports = config;
