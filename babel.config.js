module.exports = {
    compact: true,
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    browsers: ['last 2 versions', 'ie >= 9'],
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-flow',
    ],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        'macros',
    ],
    env: {
        test: {
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-syntax-dynamic-import',
            ],
        },
    },
};
