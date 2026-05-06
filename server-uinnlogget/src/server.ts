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

import { configureReverseProxyApi } from './reverseProxy';

const createServer = async () => {
    const server = express();

    await setupServerDefaults(server);
    setupActuators(server);

    const router = express.Router();
    const publicRouter = express.Router();

    // Logging i json format
    server.use(logger.morganMiddleware);

    setupSkjermleserCssTilgang(publicRouter);

    publicRouter.use(express.static('./public', { index: false }));
    server.use(serverConfig.app.publicPath, publicRouter);

    configureReverseProxyApi(router);
    // Catch all route, må være sist
    await setupAndServeHtml(router);

    server.use(serverConfig.app.publicPath, router);

    server.use(errorHandling);

    return server;
};

export default createServer();
