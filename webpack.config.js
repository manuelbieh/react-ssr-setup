const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            './client/index.js'
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: '.webpack-cache'
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.resolve(path.join(__dirname, 'public')),
        publicPath: '/',
        filename: 'js/[name].js'
    }
};
