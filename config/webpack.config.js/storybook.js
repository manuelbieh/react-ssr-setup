const { client: loaders } = require('./loaders');
const { client: plugins } = require('./plugins');

module.exports = (storybookBaseConfig) => {
    storybookBaseConfig.plugins = [...storybookBaseConfig.plugins, ...plugins];
    storybookBaseConfig.module.rules = [...storybookBaseConfig.module.rules, ...loaders];

    return storybookBaseConfig;
};
