/*
This file is based heavily on https://github.com/danethurber/express-manifest-helpers
Copied into the project folder because my security fix has been ignored for over 5 months now
https://github.com/danethurber/express-manifest-helpers/pull/4

© Dane Thurber, Licensed under MIT
*/
/* eslint-disable security/detect-non-literal-fs-filename, security/detect-object-injection, security/detect-unsafe-regex */

import fs from 'fs';

let manifest;
const options = {};

const loadManifest = () => {
    if (manifest && options.cache) return manifest;

    try {
        return JSON.parse(fs.readFileSync(options.manifestPath, 'utf8'));
    } catch (err) {
        throw new Error('Asset Manifest could not be loaded.');
    }
};

const mapAttrs = (attrs) => {
    return Object.keys(attrs)
        .map((key) => `${key}="${attrs[key]}"`)
        .join(' ');
};

export const lookup = (source) => {
    manifest = loadManifest();

    if (manifest[source]) return options.prependPath + manifest[source];
    return '';
};

export const trimTag = (str) => {
    return (
        str
            // replace double spaces not inside quotes
            .replace(/ {2,}(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$)/, ' ')
            // replace extra space in opening tags
            .replace(/ >/, '>')
            // replace extra space in self closing tags
            .replace(/ {2}\/>/, ' />')
    );
};

export const getManifest = () => {
    return manifest || loadManifest();
};

export const getSources = () => {
    manifest = manifest || loadManifest();
    return Object.keys(manifest);
};

export const getStylesheetSources = () => {
    return getSources().filter((file) => file.match(/\.css$/));
};

export const getStylesheets = () => {
    return getStylesheetSources().map((source) => lookup(source));
};

export const getJavascriptSources = () => {
    return getSources().filter((file) => file.match(/\.js$/));
};

export const getJavascripts = () => {
    return getJavascriptSources().map((source) => lookup(source));
};

export const getImageSources = () => {
    return getSources().filter((file) => file.match(/\.(png|jpe?g|gif|webp|bmp)$/));
};

export const getImages = () => {
    return getImageSources().map((source) => lookup(source));
};

export const assetPath = (source) => {
    return lookup(source);
};

export const imageTag = (source, attrs = {}) => {
    return trimTag(`<img src="${lookup(source)}" ${mapAttrs(attrs)} />`);
};

export const javascriptTag = (source, attrs = {}) => {
    return trimTag(`<script src="${lookup(source)}" ${mapAttrs(attrs)}></script>`);
};

export const stylesheetTag = (source, attrs = {}) => {
    return trimTag(`<link rel="stylesheet" href="${lookup(source)}" ${mapAttrs(attrs)} />`);
};

export default (opts) => {
    const defaults = {
        cache: true,
        prependPath: '',
    };

    manifest = null;
    Object.assign(options, defaults, opts);

    return (req, res, next) => {
        res.locals.getSources = getSources;
        res.locals.getStylesheetSources = getStylesheetSources;
        res.locals.getStylesheets = getStylesheets;
        res.locals.getJavascriptSources = getJavascriptSources;
        res.locals.getJavascripts = getJavascripts;
        res.locals.getImageSources = getImageSources;
        res.locals.getImages = getImages;
        res.locals.getManifest = getManifest;
        res.locals.assetPath = assetPath;
        res.locals.imageTag = imageTag;
        res.locals.javascriptTag = javascriptTag;
        res.locals.stylesheetTag = stylesheetTag;
        next();
    };
};
