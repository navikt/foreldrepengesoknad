const path = require('node:path');
const fs = require('node:fs/promises');

process.env.NODE_ENV = 'production';
const viewsDir = process.env.VIEWS_DIR ?? path.resolve('public');

const express = require('express');
const getDecorator = require('./decorator.cjs');
const compression = require('compression');

const server = express();

server.use(express.json());

server.disable('x-powered-by');
server.use(compression());

server.use((_req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'no-referrer');
    res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
    next();
});

const renderApp = async (decoratorFragments) => {
    const indexFile = path.resolve(viewsDir, 'index.html');
    const content = await fs.readFile(indexFile, { encoding: 'utf-8' });
    const rendered = content
        .replaceAll('{{{NAV_SCRIPTS}}}', decoratorFragments.NAV_SCRIPTS)
        .replaceAll('{{{NAV_STYLES}}}', decoratorFragments.NAV_STYLES)
        .replaceAll('{{{NAV_HEADING}}}', decoratorFragments.NAV_HEADING)
        .replaceAll('{{{NAV_FOOTER}}}', decoratorFragments.NAV_FOOTER)
        .replaceAll('{{{APP_SETTINGS}}}', decoratorFragments.APP_SETTINGS);

    return rendered;
};

const startServer = async (html) => {
    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.use('/assets', express.static(path.resolve(viewsDir, 'assets')));
    server.get(/^\/(?!.*dist).*$/, (_req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

const main = async () => {
    let decorator;

    try {
        decorator = await getDecorator();
    } catch (error) {
        logError('Failed to get decorator', error);
        process.exit(1);
    }

    let rendered;

    try {
        rendered = await renderApp(decorator);
    } catch (error) {
        logError('Failed to render app', error);
        process.exit(1);
    }

    console.log(`Current view directory: ${viewsDir}`);

    await startServer(rendered);
};

main().catch((error) => {
    logError('Failed to start server', error);
    process.exit(1);
});
