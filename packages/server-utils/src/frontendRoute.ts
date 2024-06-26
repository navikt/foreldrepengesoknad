import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { Express } from 'express';
import path from 'node:path';

import config from './config.js';

export const setupAndServeHtml = async (app: Express) => {
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
