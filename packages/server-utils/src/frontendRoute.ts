import { fetchDecoratorHtml, injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { addViteModeHtmlToResponse } from '@navikt/vite-mode';
import { Router } from 'express';
import path from 'node:path';

import config from './config.js';

const dekoratørProps = {
    env: config.app.env,
    params: {
        simple: false,
        enforceLogin: false,
    },
};

export const setupAndServeHtml = async (router: Router) => {
    // When deployed, the built frontend is copied into the public directory. If running BFF locally the index.html will not exist.
    const spaFilePath = path.resolve('./public', 'index.html');

    // Only add vite-mode to dev environment
    if (config.app.env !== 'prod') {
        setupViteMode(router);
    }

    const html = await injectDecoratorServerSide({
        filePath: spaFilePath,
        ...dekoratørProps,
    });
    const renderedHtml = replaceAppSettings(html);

    router.get('*splat', (_, response) => {
        response.send(renderedHtml);
    });
};

const replaceAppSettings = (html: string) => {
    return html.replaceAll(
        '{{{APP_SETTINGS}}}',
        JSON.stringify({
            LOG_VALIDATION: `${config.app.logValidation}`,
            APP_VERSION: `${config.app.version}`,
            INNSYN: `${config.app.innsyn}`,
            FEATURE_TEST_1JULI2024_REGLER: `${config.app.test1Juli2024Regler}`,
        }),
    );
};

const setupViteMode = (router: Router) => {
    addViteModeHtmlToResponse(router, {
        port: config.app.viteModePort,
        useNonce: false,
        indexFilePath: 'src/bootstrap.tsx',
        subpath: config.app.publicPath,
        mountId: 'app',
        setCSPHeaders: false,
    });
    router.get('*splat', async (request, response, next) => {
        const viteModeHtml = response.viteModeHtml;

        if (viteModeHtml) {
            const { DECORATOR_HEADER, DECORATOR_HEAD_ASSETS, DECORATOR_SCRIPTS, DECORATOR_FOOTER } =
                await fetchDecoratorHtml(dekoratørProps);

            const appSettingsScript = `<script type="text/json" id="nav:appSettings">{{{APP_SETTINGS}}}</script>`;

            const origin = `${request.protocol}://${request.get('host')}`;
            const redirectPath = request.originalUrl; // same as window.location.pathname
            const loginUrl = `${origin}/oauth2/login?redirect=${encodeURIComponent(redirectPath)}`;

            const loggUtKnapp = `<span id="dev-mode" style="bottom: 100px;"><a href="${loginUrl}">Logg ut</a></span>`;

            const html = [
                DECORATOR_HEADER,
                DECORATOR_HEAD_ASSETS,
                DECORATOR_SCRIPTS,
                replaceAppSettings(appSettingsScript),
                loggUtKnapp,
                viteModeHtml,
                DECORATOR_FOOTER,
            ].join('');

            response.send(html);
            return;
        }

        return next();
    });
};
