import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';
import favicon from '../shared/assets/favicon.png';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import Home from './pages/Home';
import Page1 from './pages/Page-1';
import Page2 from './pages/Page-2';
import routes from './routes';
import css from './App.module.css';

const App: React.FC<any> = () => {
    const { t } = useTranslation();
    return (
        <div className={css.wrapper}>
            <Helmet
                defaultTitle="React SSR Starter – TypeScript Edition"
                titleTemplate="%s – React SSR Starter – TypeScript Edition"
                link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
            />
            <h1>
                <ReactLogo className={css.reactLogo} /> React + Express – SSR Starter – TypeScript
                Edition
            </h1>
            <Switch>
                <Route exact path={routes.home} component={Home} />
                <Route exact path={routes.page1} component={Page1} />
                <Route exact path={routes.page2} component={Page2} />
            </Switch>
            <h2>{t('router-headline')}</h2>
            <ul>
                <li>
                    <Link to="/">{t('nav.home')}</Link>
                </li>
                <li>
                    <Link to="/page-1">{t('nav.page-1')}</Link>
                </li>
                <li>
                    <Link to="/page-2">{t('nav.page-2')}</Link>
                </li>
            </ul>
        </div>
    );
};

export default App;
