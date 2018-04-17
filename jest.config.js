const paths = require('./config/paths');

module.exports = {
    verbose: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
    setupFiles: [
        '<rootDir>/node_modules/regenerator-runtime/runtime',
        '<rootDir>/config/polyfills.js',
    ],
    setupTestFrameworkScriptFile: '<rootDir>config/jest/setup.js',
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
        '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    moduleDirectories: paths.resolveModules,
    moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs'],
};
