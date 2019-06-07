const { client: loaders } = require('./loaders');
const { client: plugins } = require('./plugins');

module.exports = (storybookBaseConfig) => {
    storybookBaseConfig.plugins = [...storybookBaseConfig.plugins, ...plugins];
    storybookBaseConfig.module.rules = [...storybookBaseConfig.module.rules, ...loaders];

    storybookBaseConfig.resolve.extensions = storybookBaseConfig.resolve.extensions.concat([
        '.ts',
        '.tsx',
    ]);

    storybookBaseConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/,
    });

    return storybookBaseConfig;
};
