const express = require('express');
const server = express();
server.use(express.json());

const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./src/build/scripts/decorator');
var compression = require('compression');

server.use(compression());

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'no-referrer');
    res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
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
            APP_VERSION: '${process.env.APP_VERSION}',
            REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
            UTTAK_API_URL: '${process.env.FP_UTTAK_SERVICE_URL}',
            LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
            FAMILIE: '${process.env.FAMILIE}',
            FEATURE_VIS_PERIODER_SOM_SENDES_INN:  '${process.env.FEATURE_VIS_PERIODER_SOM_SENDES_INN}',
            FEATURE_VIS_FEILSIDE:  '${process.env.FEATURE_VIS_FEILSIDE}',
            FEATURE_VIS_ALERTSTRIPE:  '${process.env.FEATURE_VIS_ALERTSTRIPE}',
            FEATURE_TEST_WLB_REGLER:  '${process.env.FEATURE_TEST_WLB_REGLER}',
        };`);
    });

    server.get('/health/isAlive', (_req, res) => res.sendStatus(200));
    server.get('/health/isReady', (_req, res) => res.sendStatus(200));

    server.get(/^\/(?!.*dist).*$/, (_req, res) => {
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
        console.log(error);
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => logError('Failed to render app', error));
