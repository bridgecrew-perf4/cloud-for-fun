'use strict';
import redis from 'redis';
import cors from 'cors';
import express from 'express';
import { redirectHandler, shortenHandler } from './handlers.js';

const app = express();

const corsOptions = {
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
const redisClient = redis.createClient();
const port = process.env.PORT || 3000;

app.get('/:id', (req, res) => {
    redirectHandler(req, res, redisClient);
});

app.post('/shorten', (req, res) => {
    shortenHandler(req, res, redisClient);
});

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
