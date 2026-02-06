/// <reference types="vitest" />
import { sentryVitePlugin } from '@sentry/vite-plugin';
import path from 'node:path';
import { mergeConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// eslint-disable-next-line import/no-default-export
export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/foreldrepenger/soknad',
    plugins: [
        compression(),
        // Put the Sentry vite plugin after all other plugins
        sentryVitePlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN, // Kommer fra Github organization secrets
            disable: !process.env.SENTRY_AUTH_TOKEN, // Ikke last opp source maps hvis token ikke er satt. Token er bare satt når det bygges fra master branch
            org: 'nav',
            project: 'foreldrepengesoknad',
            url: 'https://sentry.gc.nav.no',
            release: {
                name: process.env.VITE_SENTRY_RELEASE, // Lages av "generate-build-version" i build workflow
            },
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
