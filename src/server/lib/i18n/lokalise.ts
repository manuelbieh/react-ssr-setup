import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import decompress from 'decompress';
import axios from 'axios';
import glob from 'glob';
import paths from '../../../../config/paths';

if (!process.env.LOKALISE_TOKEN || !process.env.LOKALISE_PROJECT_ID) {
    throw new Error('Please add lokalise credentials to your .env file');
}

export const getTempDir = () => path.join(__dirname, 'tmp');

export const download = async () => {
    try {
        // Export the i18n project
        const { data: exported } = await axios.post(
            `https://api.lokalise.co/api2/projects/${process.env.LOKALISE_PROJECT_ID}/files/download`,
            {
                format: 'json',
                plural_format: 'i18next',
                placeholder_format: 'i18n',
                original_filenames: false,
                bundle_structure: 'locales/%LANG_ISO%.%FORMAT%',
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'X-Api-Token': process.env.LOKALISE_TOKEN,
                },
            }
        );

        // Download the exported file
        const file = await axios({ url: exported.bundle_url, responseType: 'arraybuffer' });

        return file.data;
    } catch (error) {
        console.error(error);
    }
};

// @ts-ignore
// this is not yet used so we disable the eslint rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const collectTranslationSourceFiles = async () => {
    const translationFiles = glob.sync(
        path.join(paths.locales, process.env.SOURCE_LANGUAGE, '**/*.json')
    );

    const responses = await Promise.all(translationFiles.map((file) => uploadTranslations(file)));
    console.log(responses);
};

const uploadTranslations = async (filename: string) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const data = fs.readFileSync(filename, { encoding: 'utf-8' });
    try {
        // Export the i18n project
        const { data: imported } = await axios.post(
            `https://api.lokalise.co/api2/projects/${process.env.LOKALISE_PROJECT_ID}/files/upload`,
            {
                convert_placeholders: true,
                data,
                detect_icu_plurals: true,
                filename: filename.replace('.missing', ''),
                lang_iso: process.env.SOURCE_LANGUAGE,
                replace_modified: false,
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'X-Api-Token': process.env.LOKALISE_TOKEN,
                },
            }
        );

        return imported;
    } catch (error) {
        console.error(error);
    }
};

const upload = async () => {
    const translationFiles = glob.sync(
        path.join(paths.i18n, process.env.SOURCE_LANGUAGE, '**/*.json')
    );

    console.log(translationFiles);

    // try {
    //     // Export the i18n project
    //     const { data: exported } = await axios.post(
    //         `https://api.lokalise.co/api2/projects/${process.env.LOKALISE_PROJECT_ID}/files/upload`,
    //         {
    //             detect_icu_plurals: 1,
    //             convert_placeholders: 1,
    //             replace_modified: 0,
    //             lang_iso: process.env.SOURCE_LANGUAGE,
    //             file: translationsFile,
    //         },
    //         {
    //             headers: {
    //                 'content-type': 'application/json',
    //                 'X-Api-Token': process.env.LOKALISE_TOKEN,
    //             },
    //         }
    //     );

    //     // Download the exported file
    //     const file = await axios({ url: exported.bundle_url, responseType: 'arraybuffer' });

    //     return file.data;
    // } catch (error) {
    //     console.error(error);
    // }
};

export const writeFiles = async (data: string, targetFolder: string) => {
    rimraf.sync(getTempDir());

    mkdirp.sync(targetFolder);

    // Create temporary dir to extract the translations
    mkdirp.sync(getTempDir());

    const translationsBundle = path.join(getTempDir(), 'locales.zip');

    // Extract translation files from zipfile to temp folder
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.writeFileSync(translationsBundle, data);

    // Decompress downloaded translations into temp dir to extract translations into
    // single files per namespaces later.
    await decompress(translationsBundle, getTempDir());

    // find all previously extracted [locale].json files
    const files = glob.sync(path.join(getTempDir(), '**/*.json'));

    files.forEach((file: string) => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        const fileContent = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
        const locale = path.basename(file, '.json');

        Object.entries(fileContent).forEach(([namespace, values]) => {
            mkdirp.sync(`${targetFolder}/${locale}`);

            // write namespaced translations to locale/namespace.json in target folder
            // currently translations without namespace are not supported
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            fs.writeFileSync(
                `${targetFolder}/${locale}/${namespace}.json`,
                JSON.stringify(values),
                {
                    encoding: 'utf-8',
                }
            );
        });
    });
};

export const cleanup = () => {
    rimraf.sync(getTempDir());
};

export default {
    cleanup,
    download,
    getTempDir,
    upload,
    writeFiles,
};
