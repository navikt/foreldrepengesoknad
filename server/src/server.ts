import express from 'express';

import {
    errorHandling,
    logger,
    serverConfig,
    setupActuators,
    setupServerDefaults,
    setupAndServeHtml,
} from '@navikt/fp-server-utils';

import { configureReverseProxyApi } from './reverseProxy.js';
import { validerInnkommendeIdportenToken } from './tokenValidation.js';

export const server = express();

setupServerDefaults(server);
setupActuators(server);

const router = express.Router();

// Logging i json format
server.use(logger.morganMiddleware);

server.use(validerInnkommendeIdportenToken);

configureReverseProxyApi(router);
// Catch all route, må være sist
setupAndServeHtml(router);

server.use(serverConfig.app.publicPath, router);

server.use(errorHandling);

export default server;
