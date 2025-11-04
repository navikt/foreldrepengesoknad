/// <reference types="vitest" />
import { sentryVitePlugin } from '@sentry/vite-plugin';
import path from 'node:path';
import { mergeConfig } from 'vite';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// eslint-disable-next-line import/no-default-export
export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/foreldrepenger/soknad',
    plugins: [
        sentryVitePlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: 'nav',
            project: 'foreldrepengesoknad',
            url: 'https://sentry.gc.nav.no/',
        }),
    ],
    resolve: {
        alias: {
            appData: path.resolve(__dirname, './src/app-data'),
            pages: path.resolve(__dirname, './src/pages'),
            steps: path.resolve(__dirname, './src/steps'),
            utils: path.resolve(__dirname, './src/utils'),
            api: path.resolve(__dirname, './src/api'),
            types: path.resolve(__dirname, './src/types'),
            storybookData: path.resolve(__dirname, './.storybook/storybook-data'),
        },
    },
});
