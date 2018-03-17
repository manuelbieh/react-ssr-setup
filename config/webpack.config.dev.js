// Workaround since webpack-serve is unhappy about webpack.config.js exporting a function
module.exports = [
    require('./webpack.config.js/client.dev'),
    require('./webpack.config.js/server.dev'),
];
