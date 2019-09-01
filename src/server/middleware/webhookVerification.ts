import * as express from 'express';

// This middleware is useful in cases when you want to add webhooks that
// call certain endpoints in your server side build. Add a WEBHOOK_TOKEN
// env variable and use this middleware to protect against unwanted requests.
// You will need to add ?webhookToken=[token] to your webhook's url then.
const webhookVerification = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (req.query.webhookToken !== process.env.WEBHOOK_TOKEN) {
        return res.sendStatus(403);
    }

    return next();
};

export default webhookVerification;
