import React from 'react';
import Helmet from 'react-helmet';

type Props = {
    children: any;
    css: string[];
    scripts: string[];
    state: string;
};

export default class HTML extends React.Component<Props> {
    static defaultProps = {
        css: [],
        scripts: [],
        state: '{}',
    };

    render() {
        const head = Helmet.renderStatic();
        const { children, scripts, css, state } = this.props;
        return (
            <html lang="">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}
                    {css.map((href) => {
                        return <link key={href} rel="stylesheet" href={href} />;
                    })}
                    <script
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                            __html: `window.__PRELOADED_STATE__ = ${state}`,
                        }}
                    />
                </head>
                <body>
                    {/* eslint-disable-next-line react/no-danger */}
                    <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
                    {scripts.map((src) => {
                        return <script key={src} src={src} />;
                    })}
                </body>
            </html>
        );
    }
}
