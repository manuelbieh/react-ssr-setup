import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

// const middlewares = [thunk];

export const configureStore = ({ initialState, middleware = [] } = {}) => {
    const devtools =
        typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

    const composeEnhancers = devtools || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
    );
};

export default configureStore;
