import { serverConfig } from '@navikt/fp-server-utils';

import serverPromise from './server.js';

const port = serverConfig.app.port;

serverPromise.then((server) => {
    server.listen(port, () => {
        console.log(`Starting server at ${port}`);
    });
});
