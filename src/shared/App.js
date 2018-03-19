// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { setLocale } from './store/app/actions';

import css from './App.css';

type PropsT = {
    setLocale: (string) => {},
    t: (string) => string,
};

class App extends React.PureComponent<PropsT> {
    setLanguage = (e) => {
        this.props.setLocale(e.target.value);
    };

    render() {
        const { t } = this.props;

        return (
            <div className={css.wrapper}>
                <h1>
                    <img src={require('./assets/react.svg')} className={css.reactLogo} /> React +
                    Express – SSR Starter
                </h1>
                <h2>{t('features')}</h2>
                <ul>
                    <li className={css.hot}>Webpack 4</li>
                    <li className={css.hot}>Babel 7</li>
                    <li>React 16.2</li>
                    <li>Redux</li>
                    <li>Express Webserver + Server Side Prerendering</li>
                    <li>ESLint 4</li>
                    <li>{t('i18n-support')}</li>
                    <li>CSS Modules</li>
                    <li>PostCSS</li>
                    <li>Prettier (incl. precommit-hook via lint-staged + husky)</li>
                    <li>HMR (buggy, see Readme)</li>
                </ul>

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

export default connect(null, mapDispatchToProps)(translate()(App));
