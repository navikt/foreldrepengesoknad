import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { serverConfig } from '@navikt/fp-server-utils';

export const configureReverseProxyApi = (server: Express) => {
    if (!serverConfig.proxy.apiUrl) {
        throw new Error('Påkrevd miljøvariable URL ikke satt mot API');
    }

    console.log('Server app config inneholder: ', serverConfig.app);

    server.use(
        `${serverConfig.app.publicPath}/rest`,
        createProxyMiddleware({
            target: serverConfig.proxy.apiUrl,
            changeOrigin: true,
            logger: console,
        }),
    );
};
