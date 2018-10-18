const logMessage = (message) => {
    console.log(`[${new Date().toISOString()}]`, message);
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
