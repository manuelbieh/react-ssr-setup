import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { TypedCssModulesPlugin } from 'typed-css-modules-webpack-plugin';
import paths from '../paths';
import { clientOnly } from '../../scripts/utils';
// const env = require('../env')();
import envBuilder from '../env';

const env = envBuilder();

const isProfilerEnabled = () => process.argv.includes('--profile');

export const shared = [
    new MiniCssExtractPlugin({
        filename:
            process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[contenthash].css',
        chunkFilename:
            process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[contenthash].css',
    }),
    new CaseSensitivePathsPlugin(),
];

export const client = [
    clientOnly() &&
        new HtmlWebpackPlugin({
            filename: path.join(paths.clientBuild, 'index.html'),
            inject: true,
            template: paths.appHtml,
        }),
    // new webpack.ProgressPlugin(), // make this optional e.g. via `--progress` flag
    new webpack.DefinePlugin(env.stringified),
    new webpack.DefinePlugin({
        __SERVER__: 'false',
        __BROWSER__: 'true',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin({ fileName: 'manifest.json' }),
    isProfilerEnabled() && new webpack.debug.ProfilingPlugin(),
    new TypedCssModulesPlugin({
        globPattern: 'src/**/*.css',
    }),
].filter(Boolean);

export const server = [
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
            ignore: ['*.missing.json'],
        },
    ]),
];

export default {
    shared,
    client,
    server,
};
