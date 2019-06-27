const path = require('path');
const paths = require('./config/paths');

module.exports = {
    options: {
        src: 'build/transpiled/**/*.js',
        debug: true,
        func: {
            list: ['i18next.t', 'i18n.t', 't'],
            extensions: ['.js'],
        },
        trans: {
            extensions: ['.js'],
        },
        lngs: ['en_US', 'de_DE'],
        ns: ['translation'],
        fallbackLng: 'en_US',
        defaultLng: 'en_US',
        defaultNs: 'translation',
        resource: {
            loadPath: path.join(paths.i18n, '/locales/{{lng}}/{{ns}}.json'),
            savePath: path.join(paths.i18n, '/locales/{{lng}}/{{ns}}.missing.json'),
        },
    },
};
