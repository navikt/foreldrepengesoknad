import path from 'path';
import { mergeConfig } from 'vite';

import { createSharedAppConfig } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// eslint-disable-next-line import/no-default-export
export default mergeConfig(createSharedAppConfig(setupFileDirName), {
    base: '/foreldrepenger/planlegger',
    resolve: {
        alias: {
            steps: path.resolve(__dirname, './src/steps'),
            components: path.resolve(__dirname, './src/components'),
            appData: path.resolve(__dirname, './src/app-data'),
            types: path.resolve(__dirname, './src/types'),
            utils: path.resolve(__dirname, './src/utils'),
        },
    },
});
