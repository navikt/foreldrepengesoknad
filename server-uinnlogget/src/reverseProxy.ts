import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { serverConfig } from '@navikt/fp-server-utils';

const proxy = {
    FPGRUNNDATA_API_URL: serverConfig.påkrevMiljøVariabel('FPGRUNNDATA_API_URL'),
} as const;

export const configureReverseProxyApi = (router: Router) => {
    router.use(
        '/fpgrunndata',
        createProxyMiddleware({
            target: proxy.FPGRUNNDATA_API_URL,
            changeOrigin: true,
            logger: console,
        }),
    );
};
