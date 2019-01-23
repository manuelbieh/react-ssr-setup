import React from 'react';
import Stream from 'stream';
import { pipeToNodeWritable } from 'react-dom/unstable-fizz';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import IntlProvider from '../shared/i18n/IntlProvider';
// import Html from './components/HTML';
// import App from '../shared/App';

// const Suspense = React.Suspense;
// const Suspense = 'div';

const getWritableStream = () => {
    const writable = new Stream.PassThrough();
    writable.setEncoding('utf8');
    writable.result = '';
    writable.on('data', (chunk) => (writable.result += chunk));
    return writable;
};

const serverRenderer = () => (req, res) => {
    const stream = getWritableStream();

    res.write('<html>');
    pipeToNodeWritable(
        <div style={{ color: 'red' }}>
            LOL!
            {/* <Suspense fallback={<div>Fallback</div>}>
                <div>nested div that breaks everything</div>
            </Suspense> */}
        </div>,
        stream
    );

    stream.pipe(res);
    stream.on('finish', () => {
        res.end('</html>');
    });
};

// const serverRenderer = () => (req, res) => {
//     const content = renderToString(
//         <Provider store={req.store}>
//             <Router location={req.url} context={{}}>
//                 <IntlProvider>
//                     <App />
//                 </IntlProvider>
//             </Router>
//         </Provider>
//     );
//
//     const state = JSON.stringify(req.store.getState());
//
//     return res.send(
//         '<!doctype html>' +
//             renderToString(
//                 <Html
//                     css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
//                     scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
//                     state={state}
//                 >
//                     {content}
//                 </Html>
//             )
//     );
// };

export default serverRenderer;
