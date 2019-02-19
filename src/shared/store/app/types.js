// @flow
import { setLocale } from './actions';

export type LocaleT = 'en_US' | 'de_DE';

export type SetLocaleActionT = $Call<typeof setLocale, LocaleT>;

export type AppT = {
    locale: LocaleT,
};

type GenericActionT = { type: string, payload: any };

export type ActionT = SetLocaleActionT | GenericActionT;
