/// <reference types="vitest" />
import path from 'node:path';
import { mergeConfig } from 'vite';

import { createSharedAppConfig } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// Settes i build-workflowen (build-veiviser-fp-eller-es.yml -> build.yml). Når den er satt serveres de bygde
// assetene fra CDN, mens `base` fortsatt styrer routing (BrowserRouter) og API-prefiks.
const cdnUrl = process.env.VITE_CDN_URL;

// eslint-disable-next-line import-x/no-default-export
export default mergeConfig(createSharedAppConfig(setupFileDirName), {
    base: '/foreldrepenger/foreldrepenger-eller-engangsstonad',
    ...(cdnUrl
        ? {
              experimental: {
                  renderBuiltUrl: (filename: string) => `${cdnUrl}${filename}`,
              },
          }
        : {}),
    server: {
        port: 8091,
    },
    resolve: {
        alias: {
            appData: path.resolve(__dirname, './src/app-data'),
            utils: path.resolve(__dirname, './src/utils'),
        },
    },
});
