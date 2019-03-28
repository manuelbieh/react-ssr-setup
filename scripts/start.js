const rimraf = require('rimraf');
const paths = require('../config/paths');
const { clientOnly } = require('./utils');

rimraf.sync(paths.clientBuild);
rimraf.sync(paths.serverBuild);

if (clientOnly()) {
    require('./start-client');
} else {
    require('./start-ssr');
}
