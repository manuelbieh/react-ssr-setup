// ATTENTION: this file must be in plain JS as it will also be used standalone in the
// build process with no transpiling involved!

/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const decompress = require('decompress');
const axios = require('axios');
const glob = require('glob');

if (!process.env.LOKALISE_TOKEN || !process.env.LOKALISE_PROJECT_ID) {
    throw new Error('Please add lokalise credentials to your .env file');
}

const getTempDir = () => path.join(__dirname, 'tmp');

const download = async () => {
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

// const upload = async () => {
//     const translationsFile = path.join(paths.i18n, process.env.SOURCE_LANGUAGE);
//     try {
//         // Export the i18n project
//         const { data: exported } = await axios.post(
//             `https://api.lokalise.co/api2/projects/${process.env.LOKALISE_PROJECT_ID}/files/upload`,
//             {
//                 detect_icu_plurals: 1,
//                 convert_placeholders: 1,
//                 replace_modified: 0,
//                 lang_iso: process.env.SOURCE_LANGUAGE,
//                 file: translationsFile,
//             },
//             {
//                 headers: {
//                     'content-type': 'application/json',
//                     'X-Api-Token': process.env.LOKALISE_TOKEN,
//                 },
//             }
//         );

//         // Download the exported file
//         const file = await axios({ url: exported.bundle_url, responseType: 'arraybuffer' });

//         return file.data;
//     } catch (error) {
//         console.error(error);
//     }
// };

const writeFiles = async (data, targetFolder) => {
    rimraf.sync(getTempDir());

    mkdirp(targetFolder);

    // Create temporary dir to extract the translations
    mkdirp(getTempDir());

    const translationsBundle = path.join(getTempDir(), 'locales.zip');

    // Extract translation files from zipfile to temp folder
    fs.writeFileSync(translationsBundle, data);

    // Decompress downloaded translations into temp dir to extract translations into
    // single files per namespaces later.
    await decompress(translationsBundle, getTempDir());

    // find all previously extracted [locale].json files
    const files = glob.sync(path.join(getTempDir(), '**/*.json'));

    files.forEach((file) => {
        const fileContent = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
        const locale = path.basename(file, '.json');

        Object.entries(fileContent).forEach(([namespace, values]) => {
            mkdirp(`${targetFolder}/${locale}`);

            // write namespaced translations to locale/namespace.json in target folder
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

const cleanup = () => {
    rimraf.sync(getTempDir());
};

module.exports = {
    cleanup,
    download,
    getTempDir,
    //upload,
    writeFiles,
};
