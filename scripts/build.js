const webpack = require('webpack');
const rimraf = require('rimraf');
const webpackConfig = require('../config/webpack.config.js')(process.env.NODE_ENV || 'production');
const paths = require('../config/paths');
const { logMessage, compilerPromise } = require('./utils');

const build = async () => {
    rimraf.sync(paths.clientBuild);
    rimraf.sync(paths.serverBuild);

    const [clientConfig, serverConfig] = webpackConfig;
    const multiCompiler = webpack([clientConfig, serverConfig]);

    const clientCompiler = multiCompiler.compilers[0];
    const serverCompiler = multiCompiler.compilers[1];

    const clientPromise = compilerPromise(clientCompiler);
    const serverPromise = compilerPromise(serverCompiler);

    serverCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(serverConfig.stats));
            return;
        }
    });

    clientCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(clientConfig.stats));
            return;
        }
    });

    // wait until client and server is compiled
    try {
        await serverPromise;
        await clientPromise;
        logMessage('Done!', 'info');
        process.exit();
    } catch (error) {
        logMessage(error, 'error');
    }
};

build();
