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

const TILLATTE_SEC_FETCH_SITE = new Set(['same-origin', 'same-site']);

/**
 * CSRF-djupforsvar: avviser API-kall som nettlesaren har markert som kryss-opphav.
 * Sec-Fetch-Site sendast av alle moderne nettlesarar. Når headeren manglar (eldre
 * nettlesarar eller ikkje-nettlesar-klientar) lèt vi requesten passere for å unngå
 * å bryte legitim trafikk.
 */
const avvisKryssOpphavsKall = (request: Request, response: Response, next: NextFunction) => {
    const secFetchSite = request.headers['sec-fetch-site'];
    if (secFetchSite === undefined || TILLATTE_SEC_FETCH_SITE.has(String(secFetchSite))) {
        return next();
    }
    logger.warning(`Avviste API-kall med Sec-Fetch-Site=${secFetchSite}`);
    response.status(403).send();
};

const fjernSesjonsHeadere = (proxyRequest: { removeHeader: (name: string) => void }) => {
    proxyRequest.removeHeader('cookie');
};

export function configureReverseProxyApi(router: Router) {
    addProxyHandler(router, {
        ingoingUrl: '/fpsoknad/api',
        outgoingUrl: proxy.FPSOKNAD_API_URL,
        scope: proxy.FPSOKNAD_API_SCOPE,
    });

    addProxyHandler(router, {
        ingoingUrl: '/fpoversikt/api',
        outgoingUrl: proxy.FPOVERSIKT_API_URL,
        scope: proxy.FPOVERSIKT_API_SCOPE,
    });

    router.use(
        '/fpgrunndata/api',
        avvisKryssOpphavsKall,
        createProxyMiddleware({
            target: proxy.FPGRUNNDATA_API_URL,
            changeOrigin: true,
            logger: console,
            on: {
                proxyReq: (proxyRequest) => {
                    // Strip sesjons-cookien slik at IDporten-sidecar-cookien ikkje lek
                    // ut til fpgrunndata. Tenesta krev ikkje autentisering og skal
                    // ikkje sjå brukar-sesjonen vår.
                    fjernSesjonsHeadere(proxyRequest);
                },
            },
        }),
    );
}

function addProxyHandler(router: Router, { ingoingUrl, outgoingUrl, scope }: ProxyOptions) {
    router.use(
        ingoingUrl,
        avvisKryssOpphavsKall,
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
