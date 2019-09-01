const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});

const paths = require('../config/paths');
const { download, writeFiles, cleanup } = require('../src/server/lib/i18n/lokalise');

const pull = async () => {
    const data = await download();
    await writeFiles(data, paths.locales);
    cleanup();
};

pull();
