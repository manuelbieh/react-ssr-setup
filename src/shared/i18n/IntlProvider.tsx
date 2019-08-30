import React, { useEffect } from 'react';
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import { withRouter } from 'react-router-dom';
// import { initReactI18next, I18nextProvider } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import { getLocale } from '../store/app/selectors';

import deDE from './locales/de_DE/translation.json';
import enUS from './locales/en_US/translation.json';

i18next.use(__BROWSER__ ? i18nextXHRBackend : {}).init({
    backend: {
        // for all available options read the backend's repository readme file
        loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
        // Must be false until Suspense is supported on the server side
        useSuspense: false,
        wait: true,
    },
    debug: process.env.NODE_ENV === 'development' && __BROWSER__,
    fallbackLng: 'en_US',
    fallbackNS: ['translation'],
    // This option is necessary to tell i18next to try loading missing resources via
    // i18next-xhr-backend, otherwise no calls will be made if resources are defined.
    partialBundledLanguages: true,
    resources: {
        de_DE: { translation: deDE },
        en_US: { translation: enUS },
    },
    parseMissingKeyHandler: (missing) => {
        if (process.env.NODE_ENV === 'development' && __BROWSER__) {
            console.warn('MISSING TRANSLATION:', missing);
        }
        return missing;
    },
});

i18next.languages = ['de_DE', 'en_US'];

type Props = {
    children: React.ReactNode;
    locale: 'en_US' | 'de_DE';
};

const I18N = ({ children, locale }: Props) => {
    useEffect(() => {
        i18next.changeLanguage(locale);
    }, [locale]);

    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

const mapStateToProps = (state: any) => ({
    locale: getLocale(state),
});

export default withRouter<any, any>(
    connect(
        mapStateToProps,
        null,
        null,
        { pure: false }
    )(React.memo(I18N))
);
