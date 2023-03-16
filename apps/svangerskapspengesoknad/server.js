const express = require('express');
const server = express();
server.use(express.json());

const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./src/build/scripts/decorator');
var compression = require('compression');

server.disable('x-powered-by');

// Prometheus metrics
const prometheus = require('prom-client');
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });
const httpRequestDurationMicroseconds = new prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});

server.use(compression());

require('dotenv').config('./.env');

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    next();
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

    server.get(['/dist/settings.js'], (_req, res) => {
        res.set('content-type', 'application/javascript');
        res.send(`window.appSettings = {
            REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
            LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
            LOG_VALIDATION: '${process.env.LOG_VALIDATION}',
        };`);
    });

    server.get('/internal/metrics', (req, res) => {
        res.set('Content-Type', prometheus.register.contentType);
        res.end(prometheus.register.metrics());
    });

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.get(/^\/(?!.*dist).*$/, (req, res) => {
        res.send(html);
        httpRequestDurationMicroseconds.labels(req.route.path).observe(10);
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
