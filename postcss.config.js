module.exports = {
    plugins: [
        require('postcss-flexbugs-fixes')(),
        require('postcss-nested')(),
        require('postcss-custom-properties')(),
        require('autoprefixer')({
            browsers: ['last 3 versions', 'ie >= 9', 'Edge <= 15'],
        }),
        require('postcss-custom-properties')(),
        require('postcss-assets')({
            basePath: './assets',
        }),
        require('postcss-normalize')(),
    ],
    sourceMap: true,
};
