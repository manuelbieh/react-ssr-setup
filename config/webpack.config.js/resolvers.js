const paths = require('../paths');

module.exports = {
    extensions: ['.js', '.mjs', '.json', '.jsx', '.ts', '.tsx', '.css'],
    modules: paths.resolveModules,
};
