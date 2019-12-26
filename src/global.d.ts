declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PUBLIC_URL: string;
        SOURCE_LANGUAGE: 'string';
    }
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

    const src: string;
    export default src;
}

declare module '*.module.css' {
    const css: { [key: string]: string };
    export default css;
}

declare module '*.css' {
    export default any;
}

declare const __BROWSER__: boolean;
declare const __SERVER__: boolean;

interface Window {
    browserHistory: any;
    store: any;
    __PRELOADED_STATE__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

declare module 'express-manifest-helpers';
