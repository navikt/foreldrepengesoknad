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

export const server = express();

setupServerDefaults(server);
setupActuators(server);

const router = express.Router();
const publicRouter = express.Router();

// Logging i json format
server.use(logger.morganMiddleware);

publicRouter.use(express.static('./public', { index: false }));
server.use(serverConfig.app.publicPath, publicRouter);

configureReverseProxyApi(router);
// Catch all route, må være sist
setupAndServeHtml(router);

server.use(serverConfig.app.publicPath, router);

server.use(errorHandling);

export default server;
