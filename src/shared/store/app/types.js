// @flow

export type LocaleT = 'en-US' | 'de-DE';

export type AppT = {
    locale: LocaleT,
};

type GenericActionT = { type: string, payload: * };

export type ActionT = GenericActionT;
