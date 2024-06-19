import { getToken, requestTokenxOboToken } from '@navikt/oasis';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { serverConfig } from '@navikt/fp-server-utils';

const oboHeader = 'obo-token';
const apiUrl = (): string => {
    if (!serverConfig.proxy.apiUrl) {
        throw new Error('Påkrevd miljøvariable FORELDREPENGER_API_URL ikke satt mot API');
    }
    return serverConfig.proxy.apiUrl!;
};

const apiScope = (): string => {
    if (!serverConfig.proxy.apiScope) {
        throw new Error('Påkrevd miljøvariable FORELDREPENGER_API_SCOPE ikke satt mot API');
    }
    return serverConfig.proxy.apiScope!;
};

export const veksleTokenTilTokenX = async (request: Request, response: Response, next: NextFunction) => {
    const token = getToken(request);
    if (!token) {
        return response.status(401).send();
    }
    const obo = await requestTokenxOboToken(token, apiScope());
    if (obo.ok) {
        request.headers[oboHeader] = obo.token;
        return next();
    } else {
        console.log('OBO-exchange failed', obo.error);
        return response.status(403).send();
    }
};

export const proxyRequestTilApi = createProxyMiddleware({
    target: apiUrl(),
    changeOrigin: true,
    logger: console,
    on: {
        proxyReq: (proxyRequest, request) => {
            const obo = request.headers[oboHeader];
            if (obo) {
                proxyRequest.removeHeader(oboHeader);
                proxyRequest.removeHeader('cookie');
                proxyRequest.setHeader('Authorization', `Bearer ${obo}`);
            } else {
                console.log(`Access token var not present in session for scope ${apiScope()}`);
            }
        },
    },
});
