import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import cookieParser from 'cookie-parser';
import { Express, Response } from 'express';
import path from 'node:path';

import config from './config.js';

export const setupAndServeHtml = async (app: Express) => {
    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./public', 'index.html');

    // Only add vite-mode to dev environment
    if (config.app.env === 'dev') {
        addLocalViteServerHandlerWithDecorator(app);
    }

    const html = await injectDecorator(spaFilePath);

    const renderedHtml = html.replaceAll(
        '{{{APP_SETTINGS}}}',
        JSON.stringify({
            LOG_VALIDATION: `${config.app.logValidation}`,
            APP_VERSION: `${config.app.version}`,
            INNSYN: `${config.app.innsyn}`,
            PUBLIC_PATH: `${config.app.publicPath}`,
            FEATURE_TEST_1JULI2024_REGLER: `${config.app.test1Juli2024Regler}`,
        }),
    );

    app.get(/^\/(?!.*dist).*$/, async (_request, response) => {
        return response.send(renderedHtml);
    });
};

async function injectDecorator(filePath: string) {
    return injectDecoratorServerSide({
        env: config.app.env,
        filePath,
        params: {
            simple: true,
            enforceLogin: false,
        },
    });
}

function addLocalViteServerHandlerWithDecorator(app: Express) {
    const viteDevelopmentServerPath = path.resolve('.', 'vite-dev-server.html');

    app.use(cookieParser());
    app.get('/vite-on', (_, response) => {
        setViteCookie(response, true);
        return response.redirect('/');
    });
    app.get('/vite-off', (_, response) => {
        setViteCookie(response, false);
        return response.redirect('/');
    });
    app.get('*', async (request, response, next) => {
        const localViteServerIsEnabled = request.cookies['use-local-vite-server'] === 'true';
        if (localViteServerIsEnabled) {
            const html = await injectDecorator(viteDevelopmentServerPath);

            return response.send(html);
        }
        return next();
    });
}

function setViteCookie(response: Response, cookieValue: boolean) {
    response.cookie('use-local-vite-server', cookieValue, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
    });
}
