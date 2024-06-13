import { serverConfig } from '@navikt/fp-server-utils';

import server from './server.js';

const port = serverConfig.app.port;

server.listen(port, () => {
    console.log(`Starting server at ${port}`);
});
