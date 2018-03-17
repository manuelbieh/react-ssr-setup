const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelLoader = {
    test: /\.(js|jsx)$/,
    // exclude: /node_modules/,
    loader: 'babel-loader',
};

const cssLoaderClient = {
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                camelCase: true,
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
            },
        },
        'postcss-loader?sourceMap',
    ],
};

const cssLoaderServer = {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'css-loader/locals',
            options: {
                camelCase: true,
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
            },
        },
        'postcss-loader?sourceMap',
    ],
};

const urlLoader = {
    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
    },
};

const fileLoader = {
    exclude: [/\.(js|css|mjs|html|json)$/],
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'static/media/[name].[hash:8].[ext]',
            },
        },
    ],
};

const client = [
    {
        oneOf: [babelLoader, cssLoaderClient, urlLoader, fileLoader],
    },
];

const server = [babelLoader, cssLoaderServer, urlLoader, fileLoader];

module.exports = {
    client,
    server,
};
