import { createProxyMiddleware } from 'http-proxy-middleware';

import { serverConfig } from '@navikt/fp-server-utils';

const apiUrl = (): string => {
    if (!serverConfig.proxy.apiUrl) {
        throw new Error('Påkrevd miljøvariable URL ikke satt mot API');
    }
    return serverConfig.proxy.apiUrl!;
};

export const reverseProxyApi = createProxyMiddleware({
    target: apiUrl(),
    changeOrigin: true,
    logger: console,
});
