const chalk = require('chalk');

const logMessage = (message, level = 'info') => {
    const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white';
    console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

const compilerPromise = (compiler) => {
    return new Promise((resolve, reject) => {
        compiler.plugin('done', (stats) => {
            if (!stats.hasErrors()) {
                return resolve();
            }
            return reject('Compilation failed');
        });
    });
};

module.exports = {
    logMessage,
    compilerPromise,
};
