const { clientOnly } = require('./utils');

if (clientOnly()) {
    require('./build-client');
} else {
    require('./build-ssr');
}
