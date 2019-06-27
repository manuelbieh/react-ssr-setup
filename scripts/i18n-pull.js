const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
process.chdir(path.join(__dirname, '..'));
require('dotenv').config();
const request = require('request-promise');
const axios = require('axios');
const decompress = require('decompress');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const paths = require('../config/paths');

if (!process.env.LOKALISE_TOKEN || !process.env.LOKALISE_PROJECT_ID) {
    console.error(chalk.bold(chalk.red('Please add lokalise credentials to your .env file')));
    process.exit();
}

const tempDir = path.join(__dirname, 'tmp');
// Create temporary dir to extract the translations
mkdirp(tempDir);

const translationsBundle = path.join(tempDir, 'locales.zip');

(async () => {
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
        const file = await request({ url: exported.bundle_url, encoding: null });

        // ... extract translation files from zipfile there
        fs.writeFileSync(translationsBundle, file);

        await decompress(translationsBundle, paths.i18n);

        // cleanup
        rimraf.sync(tempDir);

        console.log('');
        console.log(chalk.green('Successfully downloaded translation files'));
    } catch (err) {
        console.error(err);
    }
})();
