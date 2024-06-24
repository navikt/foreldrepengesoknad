import express from 'express';

import {
    errorHandling,
    logger,
    serverConfig,
    setupActuators,
    setupServerDefaults,
    setupStaticRoutes,
} from '@navikt/fp-server-utils';

import { reverseProxyApi } from './reverseProxy';

export const server = express();

setupServerDefaults(server);
setupActuators(server);

// Logging i json format
server.use(logger.morganMiddleware);

server.use(`${serverConfig.app.publicPath}/rest`, reverseProxyApi);

// Catch all route, må være sist
setupStaticRoutes(server);

server.use(errorHandling);

export default server;
