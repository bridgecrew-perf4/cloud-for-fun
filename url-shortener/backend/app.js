'use strict';
import redis from 'redis';
import cors from 'cors';
import express from 'express';
import swaggerJSDocs from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { redirectHandler, shortenHandler } from './handlers.js';

const app = express();
const redisClient = redis.createClient();
const port = process.env.PORT || 3000;

const corsOptions = {
    methods: 'GET,HEAD,PUT,POST',
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'url-shortener api',
            version: '1.0.0',
            description:
                'Documentation of the url-shortener api, powered by swagger-ui and swagger-jdoc.',
        },
        contact: {
            name: 'Emmanuel Adrian',
            url: 'https://github.com/adriamanu',
            email: 'emmanuel.adrian54@gmail.com',
        },
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['app.js'],
};
const specs = swaggerJSDocs(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

/**
 * @swagger
 * /:
 *    get:
 *      description: Healthcheck route
 *      responses:
 *        '200':
 *          content:
 *          text/html:
 *            schema:
 *              type: string
 *              example: 'alive'
 */
app.get('/', (req, res) => {
    res.status(200).send('alive');
});

/**
 * @swagger
 * /{id}:
 *    get:
 *      description: Retrieve shortened link and redirect
 *      summary: Retrieve shortened link and redirect
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 */
app.get('/:id', (req, res) => {
    redirectHandler(req, res, redisClient);
});

/**
 * @swagger
 * /shorten:
 *    post:
 *      description: Retrieve shortened link and redirect
 *      parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *      responses:
 *         201:
 *           description: 'Your shortened url'
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           url:
 *                               type: string
 *                               example: 'http://localhost:3000/pvqqed'
 */
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
