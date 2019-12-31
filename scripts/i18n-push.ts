import { promises as fs } from 'fs';
import path from 'path';
import glob from 'glob';
import axios from 'axios';
import paths from '../config/paths';

// curl --request POST \
//   --url https://api.lokalise.com/api2/projects/562546565d15501e66e558.60519915/files/upload \
//   --header 'content-type: application/json' \
//   --header 'x-api-token: aea09c4a67208079b4c51d9e75ccf62beb247581' \
//   --data '{"filename":"api-import.json","data":"ewogICJmZWF0dXJlcyI6ICJGZWF0dXJlcyIsCiAgImkxOG4tZXhhbXBsZSI6ICJpMThuIEV4YW1wbGUiLAogICJpMThuLXN1cHBvcnQiOiAiaTE4biBzdXBwb3J0ICh2aWEgUmVhY3QgaTE4TmV4dCkiCn0K","lang_iso":"en","tags":["index","admin","v2.0"],"convert_placeholders":true}'

const upload = async () => {
    const translationFiles = glob.sync(
        path.join(paths.locales, process.env.SOURCE_LANGUAGE, '**/*.json')
    );

    const responses = await Promise.all(
        translationFiles.map((file) => uploadTranslationSourceFile(file))
    );

    (responses || []).forEach((response) => {
        console.log(`[${response.file}]:`, JSON.stringify(response.result, null, 2));
    });
};

const uploadTranslationSourceFile = async (filename: string) => {
    const data = await fs.readFile(filename);
    try {
        // Export the i18n project
        const { data: imported } = await axios.post(
            `https://api.lokalise.co/api2/projects/${process.env.LOKALISE_PROJECT_ID}/files/upload`,
            {
                convert_placeholders: true,
                data: Buffer.from(data).toString('base64'),
                detect_icu_plurals: true,
                filename: path.basename(filename.replace('.missing', '')),
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
        console.log(error);

        if (error.response && typeof error.response !== 'undefined') {
            const { response } = error;
            console.error({
                file: path.basename(filename),
                status: response.status,
                statusText: response.statusText,
            });
        }
    }
};

upload();
