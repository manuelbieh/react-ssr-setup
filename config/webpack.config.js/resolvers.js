const paths = require('../paths');

module.exports = {
    extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
    modules: paths.resolveModules,
    alias: {
        ui_kit: 'packages/ui-kit',
    },
};
