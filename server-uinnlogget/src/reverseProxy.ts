import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { serverConfig } from '@navikt/fp-server-utils';

const proxy = {
    FORELDREPENGER_API_URL: serverConfig.påkrevMiljøVariabel('FORELDREPENGER_API_URL'),
} as const;

export const configureReverseProxyApi = (router: Router) => {
    if (!proxy.FORELDREPENGER_API_URL) {
        throw new Error('Påkrevd miljøvariable URL ikke satt mot API');
    }

    router.use(
        '/rest',
        createProxyMiddleware({
            target: proxy.FORELDREPENGER_API_URL,
            changeOrigin: true,
            logger: console,
        }),
    );
};
