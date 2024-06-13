import express from 'express';

import { errorHandling, logger, setupActuators, setupServerDefaults, setupStaticRoutes } from '@navikt/fp-server-utils';

import { configureReverseProxyApi } from './reverseProxy';

export const server = express();

setupServerDefaults(server);

// Logging i json format
server.use(logger.morganMiddleware);

setupActuators(server);

configureReverseProxyApi(server);

// Catch all route, må være sist
setupStaticRoutes(server);

server.use(errorHandling);

export default server;
