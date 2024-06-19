import { createProxyMiddleware } from 'http-proxy-middleware';

import { serverConfig } from '@navikt/fp-server-utils';

const apiUrl = serverConfig.proxy.apiUrl!;

export const reverseProxyApi = createProxyMiddleware({
    target: apiUrl,
    changeOrigin: true,
    logger: console,
});
