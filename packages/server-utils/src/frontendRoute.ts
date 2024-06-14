import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import express, { Express } from 'express';
import path from 'node:path';

import config from './config.js';

export const setupStaticRoutes = async (app: Express) => {
    app.use(express.static('./public', { index: false }));

    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./public', 'index.html');

    const html = await injectDecorator(spaFilePath);

    const renderedHtml = html.replaceAll(
        '{{{APP_SETTINGS}}}',
        JSON.stringify({
            LOG_VALIDATION: `${config.app.logValidation}`,
            APP_VERSION: `${config.app.version}`,
            INNSYN: `${config.app.innsyn}`,
            PUBLIC_PATH: `${config.app.publicPath}`,
        }),
    );

    app.use(`${config.app.publicPath}/assets`, express.static(path.resolve(path.resolve('public'), 'assets')));
    app.get(/^\/(?!.*dist).*$/, async (_request, response) => {
        return response.send(renderedHtml);
    });
};

async function injectDecorator(filePath: string) {
    return injectDecoratorServerSide({
        env: config.app.env,
        filePath,
        serviceDiscovery: false,
        params: { simple: true },
    });
}
