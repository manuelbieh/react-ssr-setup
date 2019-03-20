const { clientOnly } = require('./utils');

if (clientOnly()) {
    require('./start-client');
} else {
    require('./start-ssr');
}
