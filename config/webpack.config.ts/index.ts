export default (env = 'production') => {
    // TODO: evaluate if using dynamic imports would be viable here
    if (env === 'development' || env === 'dev') {
        process.env.NODE_ENV = 'development';
        return [require('./client.dev').default, require('./server.dev')];
    }
    process.env.NODE_ENV = 'production';
    return [require('./client.prod'), require('./server.prod')];
};
