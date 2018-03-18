// @flow
import * as React from 'react';
import { translate } from 'react-i18next';
import Page1 from './components/Page-1';
import css from './App.css';

const App = ({ t }: { t: (string) => string }) => (
    <div className={css.test}>
        <p>Hello world</p>
        <p>{t('test')}</p>
        <Page1 />
    </div>
);

export default translate()(App);
