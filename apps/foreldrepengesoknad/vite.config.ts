/// <reference types="vitest" />
import path from 'path';
import { mergeConfig } from 'vite';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/foreldrepenger/soknad',
    resolve: {
        alias: {
            appData: path.resolve(__dirname, './src/app-data'),
            pages: path.resolve(__dirname, './src/pages'),
            steps: path.resolve(__dirname, './src/steps'),
            utils: path.resolve(__dirname, './src/utils'),
            api: path.resolve(__dirname, './src/api'),
            types: path.resolve(__dirname, './src/types'),
            storybookData: path.resolve(__dirname, '.storybook/testData'),
        },
    },
});
