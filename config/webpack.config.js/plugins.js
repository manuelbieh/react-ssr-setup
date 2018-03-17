const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = require('../env')();

const shared = [];

const client = [
    new webpack.DefinePlugin(env.stringified),
    new webpack.DefinePlugin({
        __SERVER__: 'false',
        __CLIENT__: 'true',
    }),
    // new MiniCssExtractPlugin({
    //     filename: '[name].css',
    //     chunkFilename: '[id].css',
    // }),
    new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin({ fileName: 'manifest.json' }),
];

const server = [
    new webpack.DefinePlugin({
        __SERVER__: 'true',
        __CLIENT__: 'false',
    }),
];

module.exports = {
    shared,
    client,
    server,
};
