import { logger, serverConfig } from '@navikt/fp-server-utils';

import serverPromise from './server.js';

const port = serverConfig.app.port;

const server = await serverPromise;
server.listen(port, () => {
    logger.info(`Starter server på ${port}`);
});
