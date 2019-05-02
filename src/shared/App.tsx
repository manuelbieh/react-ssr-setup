import React, { useCallback } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Features from 'shared/components/Features';
import favicon from '../shared/assets/favicon.png';
import { setLocale } from './store/app/actions';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import css from './App.module.css';

type Props = {
    setLocale: (locale: string) => void;
    t: (key: string) => string;
};

const App = ({ setLocale, t }: Props) => {
    const handleLocaleChange = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
        setLocale(e.currentTarget.value);
    }, []);

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

const mapDispatchToProps = {
    setLocale,
};

export default connect(
    null,
    mapDispatchToProps
)(withTranslation()<any>(App));
