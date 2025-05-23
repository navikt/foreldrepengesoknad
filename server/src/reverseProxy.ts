import { getToken, requestTokenxOboToken } from '@navikt/oasis';
import { NextFunction, Request, Response, Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { logger, serverConfig } from '@navikt/fp-server-utils';

type ProxyOptions = {
    ingoingUrl: string;
    outgoingUrl: string;
    scope: string;
};

export function configureReverseProxyApi(router: Router) {
    if (!serverConfig.proxy.apiUrl || !serverConfig.proxy.apiScope) {
        throw new Error('Påkrevd miljøvariable SCOPE og URL ikke satt mot API');
    }
    addProxyHandler(router, {
        ingoingUrl: '/rest',
        outgoingUrl: serverConfig.proxy.apiUrl,
        scope: serverConfig.proxy.apiScope,
    });
}

export function addProxyHandler(router: Router, { ingoingUrl, outgoingUrl, scope }: ProxyOptions) {
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
