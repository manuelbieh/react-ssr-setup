const baseConfig = require('./client.base');

const config = {
    ...baseConfig,
    mode: 'production',
    devtool: 'source-map',
};

config.output.filename = 'bundle.[hash:8].js';

module.exports = config;
