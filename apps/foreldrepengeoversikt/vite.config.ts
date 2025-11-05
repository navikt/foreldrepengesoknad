/// <reference types="vitest" />
import { sentryVitePlugin } from '@sentry/vite-plugin';
import path from 'node:path';
import { mergeConfig } from 'vite';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// eslint-disable-next-line import/no-default-export
export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/foreldrepenger/oversikt',
    plugins: [
        // Put the Sentry vite plugin after all other plugins
        sentryVitePlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN, // Kommer fra Github organization secrets
            disable: !process.env.SENTRY_AUTH_TOKEN, // Ikke last opp source maps hvis token ikke er satt. Token er bare satt når det bygges fra master branch
            org: 'nav',
            project: 'foreldrepengeoversikt',
            url: 'https://sentry.gc.nav.no',
            release: {
                name: process.env.VITE_SENTRY_RELEASE, // Lages av "generate-build-version" i build workflow
            },
        }),
    ],
    resolve: {
        alias: {
            storybookData: path.resolve(__dirname, './.storybook/storybook-data'),
        },
    },
});
