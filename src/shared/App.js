// @flow
import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { setLocale } from './store/app/actions';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import Features from './components/Features';
import css from './App.module.css';

type PropsT = {
    setLocale: (string) => {},
    t: (string) => string,
};

class App extends React.PureComponent<PropsT> {
    setLanguage = (e: SyntheticEvent<HTMLButtonElement>) => {
        this.props.setLocale(e.target.value);
    };

    render() {
        const { t } = this.props;

        return (
            <div className={css.wrapper}>
                <Helmet defaultTitle="React SSR Starter" titleTemplate="%s – React SSR Starter" />

                <h1>
                    <ReactLogo className={css.reactLogo} /> React + Express – SSR Starter
                </h1>

                <Features />

                <h2>{t('i18n-example')}</h2>
                <p>
                    <button value="de-DE" onClick={this.setLanguage}>
                        Deutsch
                    </button>
                    <button value="en-US" onClick={this.setLanguage}>
                        English
                    </button>
                </p>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setLocale,
};

export default connect(
    null,
    mapDispatchToProps
)(withNamespaces()(App));
