const paths = require('../paths');

module.exports = {
    extensions: ['.js', '.mjs', '.json', '.jsx', '.ts', '.tsx', '.css'],
    modules: paths.resolveModules,
    alias: {
        /* When working with linked modules which have their own node_modules we must make sure
        to always load the same React version in all components. So we define an alias here and
        resolve it to node_modules/* to avoid potential issues */
        'react': require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
        'react-router': require.resolve('react-router'),
        'react-router-dom': require.resolve('react-router-dom'),
        'react-i18next': require.resolve('react-i18next'),
        'i18next': require.resolve('i18next'),
    },
};
