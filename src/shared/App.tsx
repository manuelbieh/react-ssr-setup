import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Features from '../shared/components/Features';
import favicon from '../shared/assets/favicon.png';
import { setLocale } from './store/app/actions';
import { Locale } from './store/app/types';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import css from './App.module.css';

const App: React.FC<any> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleLocaleChange = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            dispatch(setLocale(e.currentTarget.value as Locale));
        },
        [dispatch]
    );

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
            <Features />
            <h2>{t('i18n-example')}</h2>
            <p>
                <button value="de_DE" onClick={handleLocaleChange}>
                    Deutsch
                </button>
                <button value="en_US" onClick={handleLocaleChange}>
                    English
                </button>
            </p>
        </div>
    );
};

export default App;
