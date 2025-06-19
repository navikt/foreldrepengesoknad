/// <reference types="vitest" />
import path from 'path';
import { mergeConfig } from 'vite';

import { createSharedAppConfig } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

export default mergeConfig(createSharedAppConfig(setupFileDirName), {
    base: '/foreldrepenger/foreldrepenger-eller-engangsstonad',
    resolve: {
        alias: {
            appData: path.resolve(__dirname, './src/app-data'),
            utils: path.resolve(__dirname, './src/utils'),
        },
    },
});
