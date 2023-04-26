const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./src/build/scripts/decorator.cjs');
const compression = require('compression');
const morgan = require('morgan');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
    require('dotenv').config();
}

const server = express();
server.disable('x-powered-by');
server.use(compression());

if (isDev) {
    server.set('views', `${__dirname}`);
} else {
    server.set('views', `${__dirname}/dist`);
}

server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());
server.use(morgan('tiny'));

server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    next();
});

const renderApp = (decoratorFragments) =>
    new Promise((resolve, reject) => {
        server.render(
            'index.html',
            Object.assign(
                {
                    REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL,
                    LOGIN_URL: process.env.LOGINSERVICE_URL,
                    APP_VERSION: process.env.APP_VERSION,
                },
                decoratorFragments
            ),
            (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            }
        );
    });

const startServer = async (html) => {
    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    if (isDev) {
        const fs = require('fs');
        fs.writeFileSync(path.resolve(__dirname, 'index-decorated.html'), html);
        const vedleggMockStore = './dist/vedlegg';

        if (!fs.existsSync(vedleggMockStore)) {
            fs.mkdirSync(vedleggMockStore);
        }

        const vite = await require('vite').createServer({
            root: __dirname,
            server: {
                middlewareMode: true,
                port: 8080,
                open: './index-decorated.html',
            },
        });

        server.get(/^\/(?!.*dist).*$/, (req, _res, next) => {
            const fullPath = path.resolve(__dirname, decodeURIComponent(req.path.substring(1)));
            const fileExists = fs.existsSync(fullPath);

            if ((!fileExists && !req.url.startsWith('/@')) || req.url === '/') {
                req.url = '/index-decorated.html';
            }
            next();
        });

        server.use(vite.middlewares);
    } else {
        server.use('/engangsstonad/dist/js', express.static(path.resolve(__dirname, 'dist/js')));
        server.use('/engangsstonad/dist/css', express.static(path.resolve(__dirname, 'dist/css')));

        server.get('/internal/metrics', (req, res) => {
            res.set('Content-Type', prometheus.register.contentType);
            res.end(prometheus.register.metrics());
        });

        server.get(/^\/(?!.*dist).*$/, (_req, res) => {
            res.send(html);
        });
    }

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
