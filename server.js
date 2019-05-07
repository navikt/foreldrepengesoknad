const express = require('express');
const server = express();
server.use(express.json());

const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./src/build/scripts/decorator');
const createEnvSettingsFile = require('./src/build/scripts/envSettings');
var compression = require('compression');

server.use(compression());

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

createEnvSettingsFile(path.resolve(`${__dirname}/dist/js/settings.js`));

// Prometheus metrics
const prometheusClient = require('prom-client');
const collectDefaultMetrics = prometheusClient.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });
const logEndpointCounter = new prometheusClient.Counter({
    name: 'log_endpoint_counter',
    help: 'Numbers of request to /log endpoint'
});

server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    next();
});

var winston = require('winston');
const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

const renderApp = (decoratorFragments) =>
    new Promise((resolve, reject) => {
        server.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = (html) => {
    server.use('/dist/js', express.static(path.resolve(__dirname, 'dist/js')));
    server.use('/dist/css', express.static(path.resolve(__dirname, 'dist/css')));

    server.get(['/dist/js/settings.js'], (req, res) => {
        res.sendFile(path.resolve(`../../dist/js/settings.js`));
    });

    server.get('/actuator/prometheus', (req, res) => {
        res.set('Content-Type', prometheusClient.register.contentType);
        res.end(prometheusClient.register.metrics());
    });

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));
    server.post('/log', (req, res) => {
        const { message, ...rest } = req.body;
        logger.warn(message, { ...rest });
        res.sendStatus(200);
        logEndpointCounter.inc();
    });

    server.get(/^\/(?!.*dist).*$/, (req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

getDecorator()
    .then(renderApp, (error) => {
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => logError('Failed to render app', error));
