import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router, routerMiddleware } from 'react-router-redux';
import App from '../shared/App';
import IntlProvider from '../shared/IntlProvider';
import { configureStore } from '../shared/store';

const history = createHistory();
const store = configureStore({
    initialState: window.__PRELOADED_STATE__,
    middleware: [routerMiddleware(history)],
});

hydrate(
    <Provider store={store}>
        <Router history={history}>
            <IntlProvider>
                <App />
            </IntlProvider>
        </Router>
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}
