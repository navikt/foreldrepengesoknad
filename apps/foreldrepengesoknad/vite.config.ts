/// <reference types="vitest" />
import path from 'node:path';
import { mergeConfig } from 'vite';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(import.meta.dirname, './vitest/setupTests.ts');

// Settes i build-workflowen (build-foreldrepengesoknad.yml -> build.yml). Når den er satt serveres de bygde
// assetene fra CDN, mens `base` fortsatt styrer routing (BrowserRouter) og API-prefiks.
const cdnUrl = process.env.VITE_CDN_URL;

// eslint-disable-next-line import-x/no-default-export
export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/foreldrepenger/soknad',
    ...(cdnUrl
        ? {
              experimental: {
                  renderBuiltUrl: (filename: string) => `${cdnUrl}${filename}`,
              },
          }
        : {}),
    server: {
        port: 9114,
    },
    resolve: {
        alias: {
            appData: path.resolve(import.meta.dirname, './src/app-data'),
            pages: path.resolve(import.meta.dirname, './src/pages'),
            steps: path.resolve(import.meta.dirname, './src/steps'),
            utils: path.resolve(import.meta.dirname, './src/utils'),
            api: path.resolve(import.meta.dirname, './src/api'),
            types: path.resolve(import.meta.dirname, './src/types'),
            storybookData: path.resolve(import.meta.dirname, './.storybook/storybook-data'),
        },
    },
});
