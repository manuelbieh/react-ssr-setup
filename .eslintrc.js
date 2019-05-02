const paths = require('./config/paths');

module.exports = {
    extends: ['wiremore', 'wiremore/react', 'wiremore/typescript'],
    globals: {
        __BROWSER__: true,
        __SERVER__: true,
    },
    settings: {
        'import/resolver': {
            node: {
                paths: paths.resolveModules,
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        react: {
            version: 'detect',
        },
    },
    rules: {
        'import/no-unassigned-import': 0,
        'import/no-named-as-default-member': 0,
        'prettier/prettier': 'error',
        // these two cause trouble with type imports. disable until these are resolved:
        // https://github.com/alexgorbatchev/eslint-import-resolver-typescript/issues/17
        // 'import/no-unresolved': 0,
        // https://github.com/benmosher/eslint-plugin-import/issues/1341
        'import/named': 0,
    },
};
