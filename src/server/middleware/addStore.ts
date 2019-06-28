import * as express from 'express';
import { configureStore } from '../../shared/store';

const addStore = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    res.locals.store = configureStore({});
    next();
};

export default addStore;
