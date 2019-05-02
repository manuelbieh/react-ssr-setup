export type LocaleT = 'en_US' | 'de_DE';

export type AppT = {
    locale: LocaleT;
};

type GenericActionT = { type: string; payload: any };

export type ActionT = GenericActionT;
