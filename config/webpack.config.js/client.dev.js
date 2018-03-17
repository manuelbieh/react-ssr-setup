const baseConfig = require('./client.base');
// const webpack = require('webpack');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const config = {
    ...baseConfig,
    entry: {
        ...baseConfig.entry,
        bundle: ['webpack/hot/dev-server', ...baseConfig.entry.bundle],
    },
    plugins: [
        ...baseConfig.plugins,
        new WriteFileWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
    ],
    mode: 'development',
    performance: {
        hints: false,
    },
    devServer: {
        hot: true,
    },
};

module.exports = config;
