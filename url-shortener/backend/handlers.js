'use strict';
import redis from 'redis';
const redisClient = redis.createClient();

export function redirectHandler(req, res) {
    const id = req.params.id;
    if (!id) res.status(406).send({ details: 'identifier is missing from parameters' });
    redisClient.get(id, (err, value) => {
        if (err) throw err;
        if (!value) res.status(404).send({ details: 'redirection link not found' });
        res.redirect(value);
    });
}

export function shortenHandler(req, res) {
    const urlToShorten = req.query.url;
    if (!urlToShorten) res.status(406).send({ details: 'url parameter is missing from query' });
    const randomID = Math.random().toString(36).substring(7);
    redisClient.set(randomID, urlToShorten);
    res.status(201).send({ url: `http://localhost:3000/${randomID}` });
}
