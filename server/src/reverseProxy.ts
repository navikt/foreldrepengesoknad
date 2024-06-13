import { getToken, requestTokenxOboToken } from '@navikt/oasis';
import { Express, NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { serverConfig } from '@navikt/fp-server-utils';

type ProxyOptions = {
    ingoingUrl: string;
    outgoingUrl: string;
    scope: string;
};

export const configureReverseProxyApi = (app: Express) => {
    if (!serverConfig.proxy.apiUrl || !serverConfig.proxy.apiScope) {
        throw new Error('Påkrevd miljøvariable SCOPE og URL ikke satt mot API');
    }
    return addProxyHandler(app, {
        ingoingUrl: '/rest',
        outgoingUrl: serverConfig.proxy.apiUrl,
        scope: serverConfig.proxy.apiScope,
    });
};

export function addProxyHandler(server: Express, { ingoingUrl, outgoingUrl, scope }: ProxyOptions) {
    server.use(
        ingoingUrl,
        async (request: Request, response: Response, next: NextFunction) => {
            const token = getToken(request);
            if (!token) {
                return response.status(401).send();
            }
            const obo = await requestTokenxOboToken(token, scope);
            if (obo.ok) {
                request.headers['Authorization'] = `Bearer ${obo.token}`;
                return next();
            } else {
                console.log('OBO-exchange failed', obo.error);
                return response.status(403).send();
            }
        },
        createProxyMiddleware({
            target: outgoingUrl,
            changeOrigin: true,
            logger: console,
        }),
    );
}
