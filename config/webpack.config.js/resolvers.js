// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('../paths');

module.exports = {
    extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
    modules: [paths.src, paths.srcClient, paths.srcShared, 'node_modules'],
};
