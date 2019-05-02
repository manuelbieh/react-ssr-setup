import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import createHistory from './history';
import app from './app/reducer';

const history = createHistory();

const rootReducer = combineReducers({
    app,
    router: connectRouter(history),
});

export default rootReducer;
