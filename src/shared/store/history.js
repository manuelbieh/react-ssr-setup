import createMemoryHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';

// import { createBrowserHistory, createMemoryHistory } from 'history';

export const createUniversalHistory = () => {
    if (__BROWSER__) {
        const history = window.browserHistory || createBrowserHistory();
        if (process.env.NODE_ENV === 'development' && !window.browserHistory) {
            window.browserHistory = history;
        }
        return history;
    }
    return createMemoryHistory();
};

export default createUniversalHistory;
