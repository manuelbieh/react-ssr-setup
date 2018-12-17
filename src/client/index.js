import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router, routerMiddleware } from 'connected-react-router';
import { configureStore } from '../shared/store';
import App from '../shared/App';
import IntlProvider from '../shared/i18n/IntlProvider';
import createHistory from '../shared/store/history';

const browserHistory = createHistory();

const store =
    window.store ||
    configureStore({
        initialState: window.__PRELOADED_STATE__,
        middleware: [routerMiddleware(browserHistory)],
    });

hydrate(
    <Provider store={store}>
        <Router history={browserHistory}>
            <IntlProvider>
                <App />
            </IntlProvider>
        </Router>
    </Provider>,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept();
    }

    if (!window.store) {
        window.store = store;
    }
}
