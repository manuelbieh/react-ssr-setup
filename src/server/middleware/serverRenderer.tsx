import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import IntlProvider from '../../shared/i18n/IntlProvider';
import App from '../../shared/App';
import Html from '../components/HTML';

const serverRenderer: any = () => (
    req: express.Request & { store: Store },
    res: express.Response
) => {
    const content = renderToString(
        <Provider store={res.locals.store}>
            <Router location={req.url} context={{}}>
                <IntlProvider>
                    <App />
                </IntlProvider>
            </Router>
        </Provider>
    );

    const state = JSON.stringify(res.locals.store.getState());

    return res.send(
        '<!doctype html>' +
            renderToString(
                <Html
                    css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
                    scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
                    state={state}
                >
                    {content}
                </Html>
            )
    );
};

export default serverRenderer;
