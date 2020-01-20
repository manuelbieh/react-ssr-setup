import path from 'path';
import paths from '../paths';

const getDependencyPath = (dependencyName: string) =>
    path.join(__dirname, '..', '..', 'node_modules', dependencyName);

export default {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.css'],
    modules: paths.resolveModules,
    alias: {
        /* When working with linked modules which have their own node_modules we must make sure
        to always load the same React version in all components. So we define an alias here and
        resolve it to node_modules/* to avoid potential issues */
        'react': require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
        // TODO: This artificially blows up the bundle size (255 kb -> 297 kb). Investigate why.
        // Looks like webpack then uses commonjs modules instead of treeshaken esm.
        // 'react-router-dom': require.resolve('react-router-dom'),
        // 'react-router': require.resolve('react-router'),
        // 'react-i18next': require.resolve('react-i18next'),
        // 'i18next': require.resolve('i18next'),

        // Using this instead seems to help. Has yet to be tested in production:
        'react-router': getDependencyPath('react-router'),
        'react-router-dom': getDependencyPath('react-router-dom'),
        'react-i18next': getDependencyPath('react-i18next'),
        'i18next': getDependencyPath('i18next'),
    },
};
