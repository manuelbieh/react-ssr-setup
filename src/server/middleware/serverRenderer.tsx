import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
//import { Store } from 'redux';
import { HelmetProvider } from 'react-helmet-async';
import App from '../../shared/App';
import Html from '../components/HTML';

const helmetContext = {};
const routerContext = {};

const serverRenderer: any = () => (req: express.Request, res: express.Response) => {
    const content = renderToString(
        <Router location={req.url} context={routerContext}>
            <HelmetProvider context={helmetContext}>
                <App />
            </HelmetProvider>
        </Router>
    );

    return res.send(
        '<!doctype html>' +
            renderToString(
                <Html
                    css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
                    helmetContext={helmetContext}
                    scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
                >
                    {content}
                </Html>
            )
    );
};

export default serverRenderer;
