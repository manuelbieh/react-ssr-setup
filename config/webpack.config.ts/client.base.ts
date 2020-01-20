import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import paths from '../paths';
import resolvers from './resolvers';
import plugins from './plugins';
// const { client: clientLoaders } = require('./loaders');
import { client as clientLoaders } from './loaders';
const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true;

export default {
    name: 'client',
    target: 'web',
    entry: {
        bundle: [
            // Experimentally switched to @babel-env's useBuiltIns: 'entry'
            // require.resolve('core-js/stable'),
            // require.resolve('regenerator-runtime/runtime'),
            paths.srcClient,
        ],
    },
    output: {
        path: path.join(paths.clientBuild, paths.publicPath),
        filename: 'bundle.js',
        publicPath: paths.publicPath,
        chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    module: {
        rules: clientLoaders,
    },
    resolve: { ...resolvers },
    plugins: [...plugins.shared, ...plugins.client],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                // TerserPlugin config is taken entirely from react-scripts
                terserOptions: {
                    parse: {
                        // we want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minfication steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        // TODO: according to TypeScript, compress does not have an 'ecma' option. Investigate
                        // ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending futher investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true,
                    },
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: generateSourceMap,
            }),
        ],
        namedModules: true,
        noEmitOnErrors: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    stats: {
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        children: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        timings: true,
        version: false,
    },
};
