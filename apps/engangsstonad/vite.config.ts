/// <reference types="vitest" />
import path from 'node:path';
import { mergeConfig } from 'vite';

import { createSharedConfigWithCrossorgin } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(import.meta.dirname, './vitest/setupTests.ts');

// Settes i build-workflowen (build-engangsstonad.yml -> build.yml). Når den er satt serveres de bygde
// assetene fra CDN, mens `base` fortsatt styrer routing (BrowserRouter) og API-prefiks.
const cdnUrl = process.env.VITE_CDN_URL;

// eslint-disable-next-line import-x/no-default-export
export default mergeConfig(createSharedConfigWithCrossorgin(setupFileDirName), {
    base: '/engangsstonad/soknad',
    ...(cdnUrl
        ? {
              experimental: {
                  renderBuiltUrl: (filename: string) => `${cdnUrl}${filename}`,
              },
          }
        : {}),
    server: {
        port: 9113,
    },
    resolve: {
        alias: {
            styles: path.resolve(import.meta.dirname, './src/styles'),
            types: path.resolve(import.meta.dirname, './src/types/'),
            appData: path.resolve(import.meta.dirname, './src/app-data/'),
        },
    },
});
