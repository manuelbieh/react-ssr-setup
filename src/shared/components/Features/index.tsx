import * as React from 'react';
import css from './Features.module.css';

const Features = () => {
    return (
        <React.Fragment>
            <h2>features</h2>
            <ul className={css.wrapper}>
                <li className={css.react}>React 16.x (latest)</li>
                <li className={css.webpack}>Webpack 4</li>
                <li className={css.linter}>ESLint 6</li>
                <li className={css.hot}>Babel 7</li>
                <li className={css.hot}>TypeScript (using Babel 7)</li>
                <li className={css.jest}>Jest</li>
                <li className={css.rtl}>React Testing Library</li>
                <li className={css.racecar}>React Fast Refresh</li>
                <li>React Router 5</li>
                <li>Redux (+ Thunk)</li>
                <li>Immer</li>
                <li>Reselect</li>
                <li>React Helmet</li>
                <li>Express Webserver + Server Side Rendering</li>
                <li>CSS Modules</li>
                <li>PostCSS</li>
                <li>Prettier (incl. precommit-hook via lint-staged + husky)</li>
            </ul>
        </React.Fragment>
    );
};

export default Features;
