import { createProxyMiddleware } from 'http-proxy-middleware';

import { serverConfig } from '@navikt/fp-server-utils';
import { Router } from 'express';

export const configureReverseProxyApi = (router: Router) => {
    if (!serverConfig.proxy.apiUrl) {
        throw new Error('Påkrevd miljøvariable URL ikke satt mot API');
    }

    router.use(
        "/rest",
        createProxyMiddleware({
            target: serverConfig.proxy.apiUrl,
            changeOrigin: true,
            logger: console,
        }),
    );
};
