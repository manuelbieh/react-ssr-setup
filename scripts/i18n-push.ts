import path from 'path';
import glob from 'glob';
import axios from 'axios';
import paths from '../config/paths';

const uploadFile = async (filename: string) => {
    try {
        // Export the i18n project
        const { data: imported } = await axios.post(
            `https://api.lokalise.co/api2/projects/${process.env.LOKALISE_PROJECT_ID}/files/upload`,
            {
                detect_icu_plurals: 1,
                convert_placeholders: 1,
                replace_modified: 0,
                lang_iso: process.env.SOURCE_LANGUAGE,
                file: filename,
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
        path.join(paths.locales, process.env.SOURCE_LANGUAGE, '**/*.json')
    );

    console.log(translationFiles);
    process.exit();

    const responses = await Promise.all(translationFiles.map((file) => uploadFile(file)));
    console.log(responses);
};

upload();
