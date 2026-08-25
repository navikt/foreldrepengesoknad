/// <reference types="vitest" />
import path from 'node:path';
import { mergeConfig } from 'vite';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// Settes i build-workflowen (build-svangerskapspengesoknad.yml -> build.yml). Når den er satt serveres de bygde
// assetene fra CDN, mens `base` fortsatt styrer routing (BrowserRouter) og API-prefiks.
const cdnUrl = process.env.VITE_CDN_URL;

// eslint-disable-next-line import-x/no-default-export
export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/svangerskapspenger/soknad',
    ...(cdnUrl
        ? {
              experimental: {
                  renderBuiltUrl: (filename: string) => `${cdnUrl}${filename}`,
              },
          }
        : {}),
    server: {
        port: 9112,
    },
    resolve: {
        alias: {
            appData: path.resolve(__dirname, './src/app-data'),
            types: path.resolve(__dirname, './src/types/'),
            utils: path.resolve(__dirname, './src/utils/'),
            storybookData: path.resolve(__dirname, '.storybook/storybook-data'),
        },
    },
});
