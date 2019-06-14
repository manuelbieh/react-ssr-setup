import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './rootReducer';

type StoreParams = {
    initialState?: { [key: string]: any };
    middleware?: any[];
};

export const configureStore = ({ initialState, middleware = [] }: StoreParams) => {
    const devtools =
        typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

    const composeEnhancers = devtools || compose;

    const store = createStore(
        createRootReducer(),
        initialState,
        composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
    );

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
