import paths from './config/paths';

export default {
    plugins: [
        require('postcss-import')({
            path: [paths.srcShared, `${__dirname}/node_modules`],
        }),
        require('postcss-nested')(),
        require('postcss-flexbugs-fixes')(),
        require('autoprefixer')(),
        require('postcss-custom-properties')(),
        require('postcss-assets')({
            basePath: './assets',
        }),
        // This is broken.
        // require('postcss-normalize')(),
    ],
    sourceMap: true,
};
