const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});

const paths = require('../config/paths');
const { download, writeFiles, cleanup } = require('../src/server/lib/i18n/lokalise');

const pull = async () => {
    const data = await download();
    // console.log(__dirname + '/tmp');
    // await writeFiles(data, __dirname + '/tmp');
    await writeFiles(data, './trans');
    // await writeFiles(data, getTempDir());
    await writeFiles(data, paths.locales);
    cleanup();
};

pull();
