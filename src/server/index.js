import React from 'react';
import express from 'express';
import cors from 'cors';
import manifestHelpers from 'express-manifest-helpers';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import IntlProvider from '../shared/IntlProvider';
import { configureStore } from '../shared/store';
import App from '../shared/App';
import paths from '../../config/paths';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(paths.publicPath, express.static(paths.clientBuild));
app.use(manifestHelpers({ manifestPath: `${paths.clientBuild}/manifest.json` }));

app.use((req, res, next) => {
    req.store = configureStore();
    return next();
});

app.get('*', (req, res) => {
    const markup = renderToString(
        <Provider store={req.store}>
            <Router location={req.url} context={{}}>
                <IntlProvider>
                    <App />
                </IntlProvider>
            </Router>
        </Provider>
    );

    const state = JSON.stringify(req.store.getState());

    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title></title>
          <script src="${res.locals.assetPath('bundle.js')}" defer></script>
          <script src="${res.locals.assetPath('vendor.js')}" defer></script>
          <link rel="stylesheet" type="text/css" href="${res.locals.assetPath('bundle.css')}" />
        </head>
        <body>
          <div id="app">${markup}</div>
          <script>
              window.__PRELOADED_STATE__ = ${state};
          </script>
        </body>
      </html>
    `);
});

app.listen(process.env.PORT || 8500, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT || 8500}`);
});
