import path from 'path';
import paths from './config/paths';

export default {
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
            loadPath: path.join(paths.locales, '/{{lng}}/{{ns}}.json'),
            savePath: path.join(paths.locales, '/{{lng}}/{{ns}}.missing.json'),
        },
    },
};
