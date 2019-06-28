// TODO: Add proper security checks instead of simply disabling ESLint warnings
/*
eslint-disable
security/detect-object-injection,
security/detect-non-literal-require,
security/detect-non-literal-fs-filename
*/
import fs from 'fs';
import path from 'path';
import * as express from 'express';

type TranslationCache = {
    [locale: string]: {
        [ns: string]: {
            values: any;
            updatedAt: number;
        };
    };
};

const translationCache: TranslationCache = {};

const localesDir = `${__dirname}/locales`;

const isCached = (locale: string, ns: string) =>
    (translationCache[locale] && translationCache[locale][ns] && true) || false;

const isOutdated = (locale: string, ns: string) =>
    translationCache[locale] &&
    translationCache[locale][ns] &&
    translationCache[locale][ns].updatedAt <
        new Date(fs.statSync(path.resolve(`${localesDir}/${locale}/${ns}.json`)).mtime).getTime()
        ? true
        : false;

const loadAndCache = (locale: string, ns: string) => {
    translationCache[locale] = {
        [ns]: {
            values: fs.readFileSync(`${localesDir}/${locale}/${ns}.json`, { encoding: 'utf-8' }),
            updatedAt: Date.now(),
        },
    };
};

const getTranslations = (locale: string, ns: string) => translationCache[locale][ns].values;

const i18nextBackend = (req: express.Request, res: express.Response) => {
    const { locale, ns } = req.params;

    try {
        if (isCached(locale, ns) === false || isOutdated(locale, ns) === true) {
            loadAndCache(locale, ns);
        }

        return res.send(getTranslations(locale, ns));
    } catch (error) {
        console.log(error);
        return res.send({});
    }
};

export const updateTranslations = async (_req: any, res: any) => {
    const { download, writeFiles, cleanup } = require('../lib/i18n/lokalise');

    const data = await download();
    await writeFiles(data, `${__dirname}/locales`);
    cleanup();
    res.sendStatus(200);
};

export default i18nextBackend;
