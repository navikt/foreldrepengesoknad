import { getToken, requestTokenxOboToken } from '@navikt/oasis';
import { NextFunction, Request, Response, Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { logger, serverConfig } from '@navikt/fp-server-utils';

type ProxyOptions = {
    ingoingUrl: string;
    outgoingUrl: string;
    scope: string;
};

const proxy = {
    FPSOKNAD_API_SCOPE: serverConfig.påkrevMiljøVariabel('FPSOKNAD_API_SCOPE'),
    FPSOKNAD_API_URL: serverConfig.påkrevMiljøVariabel('FPSOKNAD_API_URL'),
    FPOVERSIKT_API_URL: serverConfig.påkrevMiljøVariabel('FPOVERSIKT_API_URL'),
    FPOVERSIKT_API_SCOPE: serverConfig.påkrevMiljøVariabel('FPOVERSIKT_API_SCOPE'),
    FPGRUNNDATA_API_URL: serverConfig.påkrevMiljøVariabel('FPGRUNNDATA_API_URL'),
} as const;

export function configureReverseProxyApi(router: Router) {
    addProxyHandler(router, {
        ingoingUrl: '/fpsoknad',
        outgoingUrl: proxy.FPSOKNAD_API_URL,
        scope: proxy.FPSOKNAD_API_SCOPE,
    });

    addProxyHandler(router, {
        ingoingUrl: '/fpoversikt',
        outgoingUrl: proxy.FPOVERSIKT_API_URL,
        scope: proxy.FPOVERSIKT_API_SCOPE,
    });

    router.use(
        '/fpgrunndata',
        createProxyMiddleware({
            target: proxy.FPGRUNNDATA_API_URL,
            changeOrigin: true,
            logger: console,
        }),
    );
}

function addProxyHandler(router: Router, { ingoingUrl, outgoingUrl, scope }: ProxyOptions) {
    router.use(
        ingoingUrl,
        async (request: Request, response: Response, next: NextFunction) => {
            const token = getToken(request);
            if (!token) {
                response.status(401).send();
                return;
            }
            const obo = await requestTokenxOboToken(token, scope);
            if (obo.ok) {
                request.headers['obo-token'] = obo.token;
                return next();
            } else {
                logger.error('Veksling av OBO-token feilet', obo.error);
                response.status(403).send();
            }
        },
        createProxyMiddleware({
            target: outgoingUrl,
            changeOrigin: true,
            logger: logger,
            on: {
                proxyReq: (proxyRequest, request) => {
                    const obo = request.headers['obo-token'];
                    if (obo) {
                        proxyRequest.removeHeader('obo-token');
                        proxyRequest.removeHeader('cookie');
                        proxyRequest.setHeader('Authorization', `Bearer ${obo}`);
                    } else {
                        logger.warning(`Access token ligger ikke i sesjon for scope ${scope}`);
                    }
                },
            },
        }),
    );
}
