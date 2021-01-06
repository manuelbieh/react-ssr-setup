import webpack from 'webpack';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import baseConfig from './client.base';
const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true;

const config = {
    ...baseConfig,
    plugins: [
        // new WriteFileWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        ...baseConfig.plugins,
    ],
    mode: 'development',
    devtool: generateSourceMap ? 'inline-cheap-module-source-map' : false,
    performance: {
        hints: false,
    },
};

export default config;
