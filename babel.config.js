module.exports = {
    compact: true,
    presets: [
        [
            '@babel/env',
            {
                modules: false,
                targets: {
                    browsers: ['last 2 versions', 'ie >= 9'],
                },
            },
        ],
        '@babel/react',
        '@babel/typescript',
    ],
    plugins: [
        '@babel/proposal-object-rest-spread',
        '@babel/proposal-class-properties',
        '@babel/proposal-optional-chaining',
        '@babel/syntax-dynamic-import',
        'macros',
    ],
    env: {
        test: {
            plugins: ['@babel/transform-modules-commonjs', '@babel/syntax-dynamic-import'],
        },
    },
};
