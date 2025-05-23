import { logger, serverConfig } from '@navikt/fp-server-utils';

import server from './server.js';

const port = serverConfig.app.port;

server.listen(port, () => {
    logger.info(`Starter server på ${port}`);
});
