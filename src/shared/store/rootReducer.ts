import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import app from './app/reducer';

const createRootReducer = (history: History) =>
    combineReducers({
        app,
        router: connectRouter(history),
    });

export default createRootReducer;
