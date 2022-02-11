import { promises as fs } from 'fs';
import path from 'path';
import glob from 'glob';
import axios from 'axios';
import paths from '../config/paths';

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
