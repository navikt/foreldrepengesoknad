require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./src/build/scripts/decorator');

const server = express();

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

const renderApp = (decoratorFragments) =>
    new Promise((resolve, reject) => {
        server.render(
            'index.html',
            Object.assign(decoratorFragments, {
                REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL,
                LOGIN_URL: process.env.LOGINSERVICE_URL
            }),
            (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            }
        );
    });

const startServer = (html) => {
    server.use(
        '/foreldrepengesoknad/dist/js',
        express.static(path.resolve(__dirname, 'dist/js'))
    );
    server.use(
        '/foreldrepengesoknad/dist/css',
        express.static(path.resolve(__dirname, 'dist/css'))
    );

    server.get(
        [
            '/',
            '/foreldrepengesoknad/?',
            /^\/foreldrepengesoknad\/(?!.*dist).*$/
        ],
        (req, res) => {
            res.send(html);
        }
    );

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

getDecorator()
    .then(renderApp, (error) => logError('Failed to get decorator', error))
    .then(startServer, (error) => logError('Failed to render app', error));
