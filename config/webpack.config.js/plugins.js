const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const paths = require('../paths');
const { clientOnly } = require('../../scripts/utils');

const env = require('../env')();

const shared = [
    new MiniCssExtractPlugin({
        filename:
            process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[contenthash].css',
        chunkFilename:
            process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[contenthash].css',
    }),
];

const client = [
    clientOnly() &&
        new HtmlWebpackPlugin({
            filename: path.join(paths.clientBuild, 'index.html'),
            inject: true,
            template: paths.appHtml,
        }),
    // new webpack.ProgressPlugin(), // make this optional e.g. via `--progress` flag
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.DefinePlugin({
        __SERVER__: 'false',
        __BROWSER__: 'true',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin({ fileName: 'manifest.json' }),
].filter(Boolean);

const server = [
    new webpack.DefinePlugin({
        __SERVER__: 'true',
        __BROWSER__: 'false',
    }),
    // We should make sure to have our locales in shared/i18n/locales ready at build time.
    // They are then copied into the server build folder so they can be accessed via
    // i18next-xhr-backend and our custom /locales/:locale/:namespace endpoint.
    new CopyPlugin([
        {
            from: paths.locales,
            to: path.join(paths.serverBuild, 'locales'),
            ignore: '*.missing.json',
        },
    ]),
];

module.exports = {
    shared,
    client,
    server,
};
