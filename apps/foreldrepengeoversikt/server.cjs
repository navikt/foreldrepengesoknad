const express = require('express');
const server = express();
server.use(express.json());
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./src/build/scripts/decorator.cjs');
const compression = require('compression');

server.disable('x-powered-by');

server.use(compression());

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
    server.use((req, res, next) => {
        if (req.hostname === 'foreldrepengeplanlegger.nav.no' && !/^\/health/.test(req.path)) {
            console.log('Redirecter fra foreldrepengeplanlegger til produktsider');
            res.redirect('https://www.nav.no/foreldrepenger#hvor-lenge');
        } else {
            next();
        }
    });

    server.use('/assets', express.static(path.resolve(__dirname, 'dist/assets')));

    server.get(['/dist/settings.js'], (req, res) => {
        res.set('content-type', 'application/javascript');
        res.send(`window.appSettings = {
            REST_API_URL: '${process.env.VITE_FORELDREPENGESOKNAD_API_URL}',
            LOGIN_URL: '${process.env.VITE_LOGINSERVICE_URL}',
            UTTAK_API_URL: '${process.env.VITE_FP_UTTAK_SERVICE_URL}',
            APPRES_CMS_URL: '${process.env.VITE_APPRES_CMS_URL}',
            KLAGE_URL: '${process.env.VITE_KLAGE_URL}'
        };`);
    });

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));
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
