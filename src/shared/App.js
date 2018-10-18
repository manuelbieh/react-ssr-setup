// @flow
import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import Features from './components/Features';
import css from './App.module.css';

class App extends React.PureComponent {
    render() {
        return (
            <div className={css.wrapper}>
                <Helmet defaultTitle="React SSR Starter" titleTemplate="%s – React SSR Starter" />

                <h1>
                    <ReactLogo className={css.reactLogo} /> React + Express – SSR Starter
                </h1>

                <Features />
            </div>
        );
    }
}

export default connect(
    null,
    null
)(App);
