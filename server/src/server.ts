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

// Skjermdeling krever tilgang til CSS uten å være innlogget!
setupSkjermleserCssTilgang(publicRouter);

// Serve pre-compressed gzip files for JS and CSS
publicRouter.use((req, res, next) => {
    logger.info('i middleware');
    if (req.path.endsWith('.js')) {
        req.url = req.url + '.br';
        res.set('Content-Encoding', 'br');
        res.set('Content-Type', 'text/javascript');
    } else if (req.path.endsWith('.css')) {
        req.url = req.url + '.br';
        res.set('Content-Encoding', 'br');
        res.set('Content-Type', 'text/css');
    }
    next();
});

publicRouter.use(express.static('./public', { index: false }));
server.use(serverConfig.app.publicPath, publicRouter);

server.use(validerInnkommendeIdportenToken);
configureReverseProxyApi(router);
// Catch all route, må være sist
setupAndServeHtml(router);

server.use(serverConfig.app.publicPath, router);

server.use(errorHandling);

export default server;
