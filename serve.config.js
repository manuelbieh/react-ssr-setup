module.exports = {
    add: (app, middleware) => {
        app.use((ctx, next) => {
            ctx.set('Access-Control-Allow-Origin', '*');
            next();
        });
        middleware.webpack();
        middleware.content();
    },
};
