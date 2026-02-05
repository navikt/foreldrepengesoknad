import compression from 'compression';
import express from 'express';

import {
    errorHandling,
    logger,
    serverConfig,
    setupActuators,
    setupAndServeHtml,
    setupServerDefaults,
    setupSkjermleserCssTilgang,
} from '@navikt/fp-server-utils';

import { configureReverseProxyApi } from './reverseProxy.js';
import { validerInnkommendeIdportenToken } from './tokenValidation.js';

export const server = express();

setupServerDefaults(server);
setupActuators(server);

const router = express.Router();
const publicRouter = express.Router();

// Logging i json format
server.use(logger.morganMiddleware);

setupSkjermleserCssTilgang(publicRouter);

// Skjermdeling krever tilgang til CSS uten å være innlogget!
publicRouter.use(compression());
publicRouter.use(express.static('./public', { index: false }));
server.use(serverConfig.app.publicPath, publicRouter);

server.use(validerInnkommendeIdportenToken);
configureReverseProxyApi(router);
// Catch all route, må være sist
setupAndServeHtml(router);

server.use(serverConfig.app.publicPath, router);

server.use(errorHandling);

export default server;
