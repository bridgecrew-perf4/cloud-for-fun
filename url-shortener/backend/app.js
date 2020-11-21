'use strict';
import redis from 'redis';
import cors from 'cors';
import express from 'express';
import { redirectHandler, shortenHandler } from './handlers.js';

const app = express();
const redisClient = redis.createClient();
const port = process.env.PORT || 3000;

const corsOptions = {
    methods: 'GET,HEAD,PUT,POST',
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get('/:id', (req, res) => {
    redirectHandler(req, res, redisClient);
});

app.get('/test', (req, res) => {
    res.status(200).send('TEST');
});

app.post('/shorten', (req, res) => {
    shortenHandler(req, res, redisClient);
});

// Keep it as the last route
app.get('/*', (req, res) => {
    res.status(404).send('Resource not found');
});

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
