// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('../paths');

// https://webpack.js.org/configuration/resolve/
module.exports = {
    extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
    // plugins: [new ModuleScopePlugin(paths.src, [paths.appPackageJson])],
    // modules: paths.nodePath,
    // modules: [paths.appSrc, 'node_modules', paths.appNodeModules].concat(
    //     process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    // ),
    modules: [paths.src, paths.srcClient, paths.srcShared, 'node_modules'],
};
