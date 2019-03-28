// @flow
import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { setLocale } from './store/app/actions';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import Features from './components/Features';
import css from './App.module.css';

type PropsT = {
    setLocale: (string) => {},
    t: (string) => string,
};

const App = (props: PropsT) => {
    const setLanguage = React.useCallback((e: SyntheticInputEvent<HTMLButtonElement>) => {
        props.setLocale(e.target.value);
    }, []);

    const [test, setTest] = React.useState(null);

    React.useLayoutEffect(() => {
        setTest('layouted');
    });

    const { t } = props;
    return (
        <div className={css.wrapper} data-foo={test}>
            <Helmet defaultTitle="React SSR Starter" titleTemplate="%s – React SSR Starter" />

            <h1>
                <ReactLogo className={css.reactLogo} /> React + Express – SSR Starter
            </h1>

            <Features />

            <h2>{t('i18n-example')}</h2>
            <p>
                <button value="de_DE" onClick={setLanguage}>
                    Deutsch
                </button>
                <button value="en_US" onClick={setLanguage}>
                    English
                </button>
            </p>
        </div>
    );
};

const mapDispatchToProps = {
    setLocale,
};

export default connect(
    null,
    mapDispatchToProps
)(withTranslation()(App));
