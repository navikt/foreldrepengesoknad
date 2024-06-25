import express from 'express';
import path from 'node:path';

import {
    errorHandling,
    logger,
    serverConfig,
    setupActuators,
    setupServerDefaults,
    setupStaticRoutes,
} from '@navikt/fp-server-utils';

import { configureReverseProxyApi } from './reverseProxy.js';
import { validerInnkommendeIdportenToken } from './tokenValidation.js';

export const server = express();

setupServerDefaults(server);
setupActuators(server);

// Logging i json format
server.use(logger.morganMiddleware);

server.use(`${serverConfig.app.publicPath}/assets`, express.static(path.resolve(path.resolve('public'), 'assets')));

server.use(validerInnkommendeIdportenToken);

configureReverseProxyApi(server);

// Catch all route, må være sist
setupStaticRoutes(server);

server.use(errorHandling);

export default server;
