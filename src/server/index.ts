// import React from 'react';
import path from 'path';
import * as express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';
import { configureStore } from '../shared/store';
import paths from '../../config/paths';
import errorHandler from './middleware/errorHandler';
import serverRenderer from './middleware/serverRenderer';

require('dotenv').config();

const app = express.default();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
    app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
    app.use('/favicon.ico', express.static(path.join(paths.clientBuild, paths.publicPath)));
    // app.use('/favicon.ico', (_req: express.Request, res: express.Response) => res.send(''));
    // app.use('/favicon.ico', (_req: express.Request, res: express.Response) =>
    //     res.sendFile('../shared/assets/favicon.png')
    // );
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const addStore = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction | undefined
): void => {
    res.locals.store = configureStore();
    if (typeof next !== 'function') {
        throw new Error('Next handler is missing');
    }
    next();
};

app.use(addStore);

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    })
);

app.use(serverRenderer());

app.use(errorHandler);

app.listen(process.env.PORT || 8500, () => {
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`)
    );
});

export default app;
