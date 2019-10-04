import { clientOnly } from './utils';

if (clientOnly()) {
    require('./build-client');
} else {
    require('./build-ssr');
}
