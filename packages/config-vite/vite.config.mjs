/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { msw } from 'msw/vite';
import { defineConfig, mergeConfig } from 'vite';
import compression from 'vite-plugin-compression2';

// I worker-only-modus legg msw-pluginen workeren i alle klient-bygg. `apply: 'serve'` hindrer at
// den havner i produksjonsbygget til appene.
// msw serverer workeren bare under `base`, men Storybook dev og Vitest browser-mode henter
// `./mockServiceWorker.js` relativt til en side utenfor `base`. Derfor sendes alle slike kall dit.
const mockServiceWorkerPlugin = () => {
    const plugin = msw({ mode: 'worker-only' });

    return {
        ...plugin,
        apply: 'serve',
        configureServer(server) {
            const workerUrl = `${server.config.base.replace(/\/?$/, '/')}mockServiceWorker.js`;

            server.middlewares.use((req, _res, next) => {
                if (req.url?.split('?')[0].endsWith('/mockServiceWorker.js')) {
                    req.url = workerUrl;
                }
                next();
            });

            return plugin.configureServer(server);
        },
    };
};

export const storybookMockServiceWorker = () => msw({ mode: 'worker-only' });

export const createSharedConfigWithCrossorgin = (setupFileDirName) =>
    mergeConfig(createSharedAppConfig(setupFileDirName), {
        plugins: [
            compression(),
            {
                name: 'crossorigin',
                transformIndexHtml(html) {
                    return html.replace(
                        /<link rel="stylesheet" crossorigin/g,
                        '<link rel="stylesheet" type="text/css"',
                    );
                },
            },
        ],
    });

export const createSharedAppConfig = (setupFileDirName) =>
    mergeConfig(createConfig(setupFileDirName), {
        server: {
            // Whitelist dev.nav.no for bruk med "vite-mode"
            cors: {
                origin: ['https://www.intern.dev.nav.no', new RegExp('^http://localhost:')],
            },
            port: 5173,
        },
        build: {
            sourcemap: true,
        },
    });

export const createSharedPackagesConfig = (setupFileDirName) => createConfig(setupFileDirName);

const createConfig = (setupFileDirName) => {
    //eslint-disable-next-line no-undef
    const args = process.argv.join(' ');
    // Kjører browser-mode kun hvis --project=browser er satt. Dette for å unngå at både jsdom og browser-mode kjører i editorer, som ikke filtrerer på prosjekt.
    const enableBrowser = /--project(?:=|\s+)browser\b/.test(args);
    const browserModeExclusions = process.cwd().endsWith('/apps/planlegger')
        ? [
              '**/ArbeidssituasjonSteg.test.tsx',
              '**/FordelingSteg.test.tsx',
              '**/HvorLangPeriodeSteg.test.tsx',
              '**/PlanenDeresSteg_Fødsel.test.tsx',
          ]
        : [];

    return defineConfig({
        plugins: [
            tailwindcss(),
            react({
                include: '**/*.{jsx,tsx}',
            }),
            mockServiceWorkerPlugin(),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
        test: {
            globals: true,
            // Tunge flertrinnsflyter (f.eks. AppContainer sine hele søknadsgjennomganger med
            // mange userEvent-interaksjoner) er trege på CPU-sultne CI-runnere (2 vCPU) og
            // rakk ikke 15s. Gi samme romsligere timeout som browser-prosjektet under.
            testTimeout: 30000,
            projects: [
                {
                    extends: true,
                    test: {
                        name: 'jsdom',
                        environment: 'jsdom',
                        css: false,
                        setupFiles: setupFileDirName,
                        env: {
                            TEST_MODE: 'jsdom-mode',
                            BASE_URL: 'https://test.nav.no',
                        },
                    },
                },
                enableBrowser && {
                    extends: true,
                    test: {
                        name: 'browser',
                        // Headless chromium i CI er tregare enn jsdom. Gje litt høgare
                        // timeout slik at userEvent-flytar (opplasting, skriving av
                        // datoar, fleirstegs-flytar) rekk å fullføre.
                        testTimeout: 30000,
                        exclude: [
                            '**/intl.test.ts',
                            ...browserModeExclusions,
                            '**/node_modules/**',
                            '**/dist/**',
                            '**/.{idea,git,cache,output,temp}/**',
                            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
                        ],
                        setupFiles: setupFileDirName,
                        browser: {
                            // Headless i CI (GitHub Actions setter CI=true), headed lokalt for enklere debugging.
                            //eslint-disable-next-line no-undef
                            headless: !!process.env.CI,
                            enabled: true,
                            provider: playwright(),
                            instances: [{ browser: 'chromium' }],
                        },
                        env: {
                            TEST_MODE: 'browser-mode',
                            BASE_URL: 'https://test.nav.no',
                        },
                    },
                },
            ].filter(Boolean),
        },
    });
};

export { fpMockModus } from './mockModusPlugin.mjs';
