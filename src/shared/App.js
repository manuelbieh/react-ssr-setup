// @flow
import * as React from 'react';
import Helmet from 'react-helmet';
import { withRouter, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AsyncComponent from './components/AsyncComponent';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import Features from './components/Features';

import { Button } from 'ui_kit';

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
                <Link to="/page-1">
                    <Button color="red">First Page</Button>
                </Link>{' '}
                |{' '}
                <Link to="/page-2">
                    <Button color="red">Second Page</Button>
                </Link>
                <p>Different asynchronously loaded routes</p>
                <Route
                    path="/page-1"
                    component={AsyncComponent(() =>
                        import('./pages/Page-1' /* webpackChunkName: "page1" */)
                    )}
                />
                <Route
                    path="/page-2"
                    component={AsyncComponent(() =>
                        import('./pages/Page-2' /* webpackChunkName: "page2" */)
                    )}
                />
            </div>
        );
    }
}

export default withRouter(
    connect(
        null,
        null
    )(App)
);
