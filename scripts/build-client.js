const webpack = require('webpack');
const rimraf = require('rimraf');
const webpackConfig = require('../config/webpack.config.js')(process.env.NODE_ENV || 'production');
const paths = require('../config/paths');
const { logMessage, compilerPromise } = require('./utils');

const build = async () => {
    rimraf.sync(paths.clientBuild);
    rimraf.sync(paths.serverBuild);

    const [clientConfig] = webpackConfig;
    const webpackCompiler = webpack([clientConfig]);

    const clientCompiler = webpackCompiler.compilers.find((compiler) => compiler.name === 'client');
    const clientPromise = compilerPromise('client', clientCompiler);

    clientCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(clientConfig.stats));
            return;
        }
    });

    // wait until client and server is compiled
    try {
        await clientPromise;
        logMessage('Done!', 'info');
        process.exit();
    } catch (error) {
        logMessage(error, 'error');
    }
};

build();
