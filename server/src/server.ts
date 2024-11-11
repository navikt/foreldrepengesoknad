import express from 'express';
import path from 'path';

import {
    errorHandling,
    logger,
    serverConfig,
    setupActuators,
    setupAndServeHtml,
    setupServerDefaults,
} from '@navikt/fp-server-utils';

import { configureReverseProxyApi } from './reverseProxy.js';
import { validerInnkommendeIdportenToken } from './tokenValidation.js';

export const server = express();

setupServerDefaults(server);
setupActuators(server);

const router = express.Router();

// Logging i json format
server.use(logger.morganMiddleware);

// Skjermdeling krever tilgang til CSS uten å være innlogget!
router.use(express.static('./public', { index: false }));
router.use('/assets', express.static(path.resolve(path.resolve('public'), 'assets')));

server.use(validerInnkommendeIdportenToken);

configureReverseProxyApi(router);
// Catch all route, må være sist
setupAndServeHtml(router);

server.use(serverConfig.app.publicPath, router);

server.use(errorHandling);

export default server;
