const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr/index.js');
const express = require('express');
const server = express();
server.use(express.json());
const path = require('path');
const mustacheExpress = require('mustache-express');
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

async function injectDecorator(filePath) {
    return injectDecoratorServerSide({
        env: 'dev',
        filePath,
        params: {
            enforceLogin: false,
            simple: true,
        },
    });
}

const startServer = async () => {
    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    const indexHtmlPath = path.resolve(__dirname, 'index.html');

    const htmlWithDecoratorInjected = await injectDecorator(indexHtmlPath);

    const renderedHtml = htmlWithDecoratorInjected.replaceAll(
        '{{{APP_SETTINGS}}}',
        JSON.stringify({
            APP_VERSION: `${process.env.APP_VERSION}`,
            PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
            INNSYN: `${process.env.INNSYN}`,
            FEATURE_TEST_1JULI2024_REGLER: `${process.env.FEATURE_TEST_1JULI2024_REGLER}`,
        }),
    );

    server.use(
        '/rest',
        createProxyMiddleware({
            target: 'http://localhost:8888/rest',
            changeOrigin: true,
            logger: console,
            on: {
                proxyReq: fixRequestBody,
            },
        }),
    );

    const fs = require('fs');
    fs.writeFileSync(path.resolve(__dirname, 'index-decorated.html'), renderedHtml);

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

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startServer();
