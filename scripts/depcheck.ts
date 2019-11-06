// TODO: this file is still WIP and is not properly configured yet
import depcheck from 'depcheck';

const options = {
    ignoreBinPackage: false,
    skipMissing: false,
    ignoreDirs: ['dist', 'build'],
    ignoreMatches: [
        // a lot of false positives for dev tooling related packages
        'eslint-*',
        'stylelint-*',
        '@babel/*',
        'babel-*',
        '@types/*',
        '@typescript-eslint/*',
        // more false positives
        'husky',
        'lint-staged',
        'install-deps-postmerge',
        'style-loader',
        '@svgr/webpack',
    ],
    parsers: {
        '*.js': depcheck.parser.es6,
        '*.jsx': depcheck.parser.jsx,
        '*.ts': depcheck.parser.typescript,
        '*.tsx': depcheck.parser.typescript,
    },
    detectors: [depcheck.detector.requireCallExpression, depcheck.detector.importDeclaration],
    specials: [depcheck.special.eslint, depcheck.special.webpack],
};

depcheck(`${__dirname}/..`, options, (unused) => {
    // console.log(unused.dependencies); // an array containing the unused dependencies
    // console.log(unused.devDependencies); // an array containing the unused devDependencies
    // console.log(unused.missing); // a lookup containing the dependencies missing in `package.json` and where they are used
    // console.log(unused.using); // a lookup indicating each dependency is used by which files
    // console.log(unused.invalidFiles); // files that cannot access or parse
    // console.log(unused.invalidDirs); // directories that cannot access
    console.log(unused);
});
