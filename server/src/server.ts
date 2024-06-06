import express from 'express';

import { errorHandling, logger, setupActuators, setupServerDefaults, setupStaticRoutes } from '@navikt/fp-server-utils';

import { configureReverseProxyApi } from './reverseProxy.js';
import { validerInnkommendeIdportenToken } from './tokenValidation.js';

export const server = express();

setupServerDefaults(server);
setupActuators(server);

// Logging i json format
server.use(logger.morganMiddleware);

server.get(['/oauth2/login'], async (_req, res) => {
    res.status(502).send({
        message: 'Wonderwall must handle /oauth2/login',
    });
});

server.use(validerInnkommendeIdportenToken);

configureReverseProxyApi(server);

// Catch all route, må være sist
setupStaticRoutes(server);

server.use(errorHandling);

export default server;
