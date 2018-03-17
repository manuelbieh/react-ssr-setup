// @flow
import React from 'react';
// import Helmet from 'react-helmet';

type PropsT = {
    children: *,
    styles: string[],
    scripts: string[],
};

export default class HTML extends React.Component<PropsT> {
    static defaultProps = {
        styles: [],
        scripts: [],
    };

    render() {
        // const head = Helmet.rewind();
        const { children, scripts, styles } = this.props;

        return (
            <html lang="">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {/* {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()} */}
                </head>
                <body>
                    {/* <div id="root" __dangerouslySetInnerHtml={{__html: children}} /> */}
                    <div id="app">{children}</div>
                    {scripts.map((src) => {
                        return <script key={src} src={src} />;
                    })}
                    {styles.map((href) => {
                        return <link key={href} rel="stylesheet" href={href} />;
                    })}
                </body>
            </html>
        );
    }
}
