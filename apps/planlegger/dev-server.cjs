const express = require('express');
const server = express();
server.use(express.json());
const path = require('path');
const mustacheExpress = require('mustache-express');
const getDecorator = require('../../server/src/decorator.cjs');
const compression = require('compression');

server.disable('x-powered-by');

server.use(compression());

require('dotenv').config();
server.set('views', `${__dirname}`);
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

const startServer = async (html) => {
    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    const fs = require('fs');
    fs.writeFileSync(path.resolve(__dirname, 'index-decorated.html'), html);

    const vite = await require('vite').createServer({
        root: __dirname,
        server: {
            middlewareMode: true,
            port: 8080,
            open: './index-decorated.html',
        },
    });

    server.get(/^\/(?!.*dist).*$/, (req, _res, next) => {
        const fullPath = path
            .resolve(__dirname, decodeURIComponent(req.path.substring(1)))
            .split('/foreldrepenger/planlegger')
            .join('');
        const fileExists = fs.existsSync(fullPath);

        if (
            (!fileExists && !req.url.startsWith('/foreldrepenger/planlegger/@')) ||
            req.url === '/foreldrepenger/planlegger'
        ) {
            req.url = '/index-decorated.html';
        }
        next();
    });

    server.use(vite.middlewares);

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
