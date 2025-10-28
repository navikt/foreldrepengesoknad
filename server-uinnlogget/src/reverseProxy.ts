import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { serverConfig } from '@navikt/fp-server-utils';

const proxy = {
    FPOVERSIKT_API_URL: serverConfig.påkrevMiljøVariabel('FPOVERSIKT_API_URL'),
} as const;

export const configureReverseProxyApi = (router: Router) => {
    router.use(
        '/fpoversikt',
        createProxyMiddleware({
            target: proxy.FPOVERSIKT_API_URL,
            changeOrigin: true,
            logger: console,
        }),
    );
};
