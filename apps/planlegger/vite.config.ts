/// <reference types="vitest" />
import path from 'node:path';
import { mergeConfig } from 'vite';

import { createSharedAppConfig } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// Settes i build-workflowen (build-planlegger.yml -> build.yml). Når den er satt serveres de bygde
// assetene fra CDN, mens `base` fortsatt styrer routing (BrowserRouter) og API-prefiks.
const cdnUrl = process.env.VITE_CDN_URL;

// eslint-disable-next-line import-x/no-default-export
export default mergeConfig(createSharedAppConfig(setupFileDirName), {
    base: '/foreldrepenger/planlegger',
    ...(cdnUrl
        ? {
              experimental: {
                  renderBuiltUrl: (filename: string) => `${cdnUrl}${filename}`,
              },
          }
        : {}),
    server: {
        port: 8090,
    },
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
