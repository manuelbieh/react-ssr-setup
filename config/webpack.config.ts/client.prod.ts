import baseConfig from './client.base';
const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true;

const config = {
    ...baseConfig,
    mode: 'production',
    devtool: generateSourceMap ? 'source-map' : false,
};

// config.output.filename = 'bundle.[fullhash:8].js';
config.output.chunkFilename = 'bundle.[fullhash:8].js';

export default config;
