// import path from 'path';
import paths from '../config/paths';
import { download, writeFiles, cleanup } from '../src/server/lib/i18n/lokalise';

const pull = async () => {
    const data = await download();
    await writeFiles(data, paths.locales);
    cleanup();
};

pull();
