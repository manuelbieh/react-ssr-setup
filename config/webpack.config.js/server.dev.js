const baseConfig = require('./server.base');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const config = {
    ...baseConfig,
    plugins: [...baseConfig.plugins, new WriteFileWebpackPlugin()],
    mode: 'development',
    performance: {
        hints: false,
    },
};

module.exports = config;
