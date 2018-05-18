import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import isClient from 'shared/utils/isClient';

export const configureStore = ({ initialState, middleware = [] } = {}) => {
    if (isClient() && window.store) {
        return window.store;
    }

    const devtools =
        typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

    const composeEnhancers = devtools || compose;

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
    );

    if (isClient()) {
        window.store = store;
    }

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./rootReducer', () =>
                store.replaceReducer(require('./rootReducer').default)
            );
        }
    }

    return store;
};

export default configureStore;

export let store;
export let history;

if (isClient()) {
    const createHistory = require('history/createBrowserHistory').default;
    const { routerMiddleware } = require('react-router-redux');

    if (window.browserHistory) {
        history = window.browserHistory;
    } else {
        history = createHistory();
    }

    store = configureStore({
        initialState: window.__PRELOADED_STATE__,
        middleware: [routerMiddleware(history)],
    });
}
