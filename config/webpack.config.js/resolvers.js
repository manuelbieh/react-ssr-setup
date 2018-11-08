const paths = require('../paths');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = {
    extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
    modules: paths.resolveModules,
    plugins: [PnpWebpackPlugin],
};
