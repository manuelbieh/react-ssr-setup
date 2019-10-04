require('@babel/register')({
    presets: [['@babel/env', { modules: 'commonjs' }], '@babel/typescript'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = require('./.eslintrc.ts').default;
