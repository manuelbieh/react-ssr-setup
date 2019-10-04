import path from 'path';
import nodeExternals from 'webpack-node-externals';
import paths from '../paths';
import { server as serverLoaders } from './loaders';
import resolvers from './resolvers';
import plugins from './plugins';

export default {
    name: 'server',
    target: 'node',
    entry: {
        // server: [path.resolve(paths.srcServer, 'index.js')],
        server: [
            require.resolve('core-js/stable'),
            require.resolve('regenerator-runtime/runtime'),
            path.resolve(paths.srcServer, 'index.ts'),
        ],
    },
    externals: [
        nodeExternals({
            // we still want imported css from external files to be bundled otherwise 3rd party packages
            // which require us to include their own css would not work properly
            whitelist: /\.css$/,
        }),
    ],
    output: {
        path: paths.serverBuild,
        filename: 'server.js',
        publicPath: paths.publicPath,
        // libraryTarget: 'commonjs2',
    },
    resolve: { ...resolvers },
    module: {
        rules: serverLoaders,
    },
    plugins: [...plugins.shared, ...plugins.server],
    stats: {
        assets: false,
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        children: false,
        colors: true,
        hash: false,
        modules: false,
        performance: false,
        reasons: false,
        timings: true,
        version: false,
    },
    node: {
        __dirname: false,
    },
};
