const path = require('path');
const fs = require('fs');

// const appDirectory = fs.realpathSync(path.resolve(__dirname, '..'));
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    clientBuild: resolveApp('build/client'),
    serverBuild: resolveApp('build/server'),
    dotenv: resolveApp('.env'),
    src: resolveApp('src'),
    srcClient: resolveApp('src/client'),
    srcServer: resolveApp('src/server'),
    srcShared: resolveApp('src/shared'),
    // publicPath: 'http://localhost:3005/static/',
    publicPath: '/static/',
};
