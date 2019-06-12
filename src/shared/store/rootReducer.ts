import { combineReducers } from 'redux';
import app from './app/reducer';

const createRootReducer = () =>
    combineReducers({
        app,
    });

export default createRootReducer;
