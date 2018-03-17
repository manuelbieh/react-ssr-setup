// @flow
import React from 'react';
import i18next from 'i18next';
import { withRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import { getLocale } from './store/app/selectors';

const resources = {
    'en-US': {
        translations: {
            test: 'test-en',
        },
    },
    'de-DE': {
        translations: {
            test: 'test-de',
        },
    },
};

i18next.init({
    fallbackLng: 'en-US',
    defaultNS: 'translations',
    fallbackNS: ['translations'],
    resources: resources,
    parseMissingKeyHandler: (missing) => {
        if (process.env.NODE_ENV === 'development') {
            console.warn('MISSING TRANSLATION:', missing);
        }
        return missing;
    },
});

type PropsT = {
    children: *,
    locale: 'en-US' | 'de-DE',
};

class I18N extends React.PureComponent<PropsT> {
    componentDidMount() {
        i18next.changeLanguage(this.props.locale);
    }

    componentDidUpdate(prevProps) {
        const { locale: newLocale } = this.props;
        const { locale: oldLocale } = prevProps;

        if (oldLocale !== newLocale) {
            i18next.changeLanguage(newLocale);
        }
    }

    render() {
        return <I18nextProvider i18n={i18next}>{this.props.children}</I18nextProvider>;
    }
}

const mapStateToProps = (state) => ({
    locale: getLocale(state),
});

export default withRouter(connect(mapStateToProps, null, null, { pure: false })(I18N));
