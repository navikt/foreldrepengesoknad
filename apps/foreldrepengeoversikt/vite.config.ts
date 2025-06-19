/// <reference types="vitest" />
import path from 'path';
import { mergeConfig } from 'vite';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// eslint-disable-next-line import/no-default-export
export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/foreldrepenger/oversikt',
    resolve: {
        alias: {
            storybookData: path.resolve(__dirname, './.storybook/storybook-data'),
        },
    },
});
