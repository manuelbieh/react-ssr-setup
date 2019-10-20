// TODO: convert to TypeScript
const paths = require('./config/paths');

module.exports = {
    verbose: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs,ts,tsx}'],
    setupFiles: [
        '<rootDir>/node_modules/regenerator-runtime/runtime',
        '<rootDir>/config/polyfills.js',
    ],
    setupFilesAfterEnv: ['<rootDir>config/jest/setup.js'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}',
        '<rootDir>/src/**/*.(spec|test).{js,jsx,mjs,ts,tsx}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx|mjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|mjs)$'],
    moduleDirectories: paths.resolveModules,
    moduleFileExtensions: ['js', 'json', 'jsx', 'mjs', 'ts', 'tsx'],
};
