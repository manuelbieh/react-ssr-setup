import { Locale } from './types';

export const ActionTypes = {
    SETLOCALE: 'app/set-locale',
};

export const setLocale = (locale: Locale) => ({
    type: ActionTypes.SETLOCALE,
    payload: locale,
});
