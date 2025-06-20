/// <reference types="vitest" />
import path from 'path';
import { mergeConfig } from 'vite';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// eslint-disable-next-line import/no-default-export
export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/svangerskapspenger/soknad',
    resolve: {
        alias: {
            appData: path.resolve(__dirname, './src/app-data'),
            types: path.resolve(__dirname, './src/types/'),
            utils: path.resolve(__dirname, './src/utils/'),
            storybookData: path.resolve(__dirname, '.storybook/storybook-data'),
        },
    },
});
