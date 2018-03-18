const baseConfig = require('./client.base');
// const webpack = require('webpack');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
// const paths = require('../paths');

const config = {
    ...baseConfig,
    // entry: {
    //     ...baseConfig.entry,
    //     bundle: [/*'webpack/hot/dev-server',*/ ...baseConfig.entry.bundle],
    // },
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

// config.plugins = [...config.plugins, new WriteFileWebpackPlugin()];

// When using webpack-serve:
// config.output.publicPath = 'http://localhost:8080/static/';

// When using webpack-dev-server
// const paths = require('../paths');
// config.devServer = {
//     contentBase: paths.clientBuild,
//     port: 9000,
// };

module.exports = config;
