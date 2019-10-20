import path from 'path';
import fs from 'fs';

// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

const paths: any = {
    appHtml: resolveApp('config/webpack.config.ts/template.html'),
    clientBuild: resolveApp('build/client'),
    serverBuild: resolveApp('build/server'),
    dotenv: resolveApp('.env'),
    src: resolveApp('src'),
    srcClient: resolveApp('src/client'),
    srcServer: resolveApp('src/server'),
    srcShared: resolveApp('src/shared'),
    types: resolveApp('node_modules/@types'),
    locales: resolveApp('src/shared/i18n/locales'),
    publicPath: '/static/',
};

paths.resolveModules = [
    paths.srcClient,
    paths.srcServer,
    paths.srcShared,
    paths.src,
    'node_modules',
];

export default paths;
