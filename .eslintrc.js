const paths = require('./config/paths');

module.exports = {
    env: {
        browser: true,
        es6: true,
        commonjs: true,
        node: true,
        jest: true,
        mocha: true,
    },
    extends: [
        'wiremore',
        'wiremore/react',
        'plugin:react/recommended',
        'prettier',
        'prettier/react',
        'plugin:flowtype/recommended',
    ],
    plugins: ['security', 'prettier', 'flowtype'],
    settings: {
        'import/resolver': {
            node: {
                paths: paths.resolveModules,
            },
        },
        flowtype: {
            onlyFilesWithFlowAnnotation: true,
        },
    },
    rules: {
        'import/named': 0,
        'import/no-unassigned-import': 0,
        'import/no-named-as-default-member': 0,
        'prettier/prettier': 'error',
        'import/no-unresolved': 'off',
    },
};
