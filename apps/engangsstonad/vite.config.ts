/// <reference types="vitest" />
import path from 'node:path';
import { mergeConfig } from 'vite';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// eslint-disable-next-line import/no-default-export
export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/engangsstonad/soknad',
    resolve: {
        alias: {
            styles: path.resolve(__dirname, './src/styles'),
            types: path.resolve(__dirname, './src/types/'),
            appData: path.resolve(__dirname, './src/app-data/'),
        },
    },
});
