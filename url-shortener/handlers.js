'use strict';
export function redirectHandler(req, res, redisClient) {
    const id = req.params.id;

    if (!id) {
        const statusCode = 406;
        res.status(statusCode).send({
            message: 'identifier is missing from parameters',
            'http-code': statusCode,
        });
    }

    redisClient.get(id, (err, value) => {
        if (err) {
            throw err;
        }
        res.redirect(value);
    });
}

export function shortenHandler(req, res, redisClient) {
    const urlToShorten = req.query.url;
    if (!urlToShorten) {
        const statusCode = 406;
        res.status(statusCode).send({
            message: 'url parameter is missing from query',
            'http-code': statusCode,
        });
    }

    const randomID = Math.random().toString(36).substring(7);
    redisClient.set(randomID, urlToShorten);
    res.status(201).send({ url: `http://localhost:3000/${randomID}` });
}
