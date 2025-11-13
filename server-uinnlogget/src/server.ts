import express from 'express';

import {
    errorHandling,
    logger,
    serverConfig,
    setupActuators,
    setupAndServeHtml,
    setupServerDefaults,
} from '@navikt/fp-server-utils';

import { configureReverseProxyApi } from './reverseProxy';

const server = express();

setupServerDefaults(server);
setupActuators(server);

const router = express.Router();
const publicRouter = express.Router();

// Logging i json format
server.use(logger.morganMiddleware);

publicRouter.use((req, res, next) => {
    const ua = req.headers.origin || '';

    if (ua.includes('https://nav.psplugin.com')) {
        res.setHeader('Cache-Control', 'no-store');
        res.removeHeader('Etag');
    }

    next();
});

publicRouter.use(express.static('./public', { index: false }));
server.use(serverConfig.app.publicPath, publicRouter);

configureReverseProxyApi(router);
// Catch all route, må være sist
setupAndServeHtml(router);

server.use(serverConfig.app.publicPath, router);

server.use(errorHandling);

export default server;
