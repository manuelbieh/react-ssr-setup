const paths = require('./config/paths');

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [paths.srcShared],
        }),
        require('postcss-nested')(),
        require('postcss-flexbugs-fixes')(),
        require('autoprefixer')(),
        require('postcss-custom-properties')(),
        require('postcss-assets')({
            basePath: './assets',
        }),
        require('postcss-normalize')(),
    ],
    sourceMap: true,
};
