import express from 'express';

import { errorHandling, logger, setupActuators, setupServerDefaults, setupStaticRoutes } from '@navikt/fp-server-utils';

import { proxyRequestTilApi, veksleTokenTilTokenX as veksleTokenXOboToken } from './reverseProxy.js';
import { validerInnkommendeIdportenToken } from './tokenValidation.js';

export const server = express();

setupServerDefaults(server);
setupActuators(server);

// Logging i json format
server.use(logger.morganMiddleware);

// Token validering, veksling og proxy
server.use(validerInnkommendeIdportenToken);
server.use('/rest', veksleTokenXOboToken, proxyRequestTilApi);

// Catch all route, må være sist
setupStaticRoutes(server);

server.use(errorHandling);

export default server;
