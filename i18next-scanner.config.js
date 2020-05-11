require('@babel/register')({
    envName: 'tooling',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = require('./i18next-scanner.config.ts').default;
