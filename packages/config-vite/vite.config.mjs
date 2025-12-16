/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vite';

export const createSharedConfigWithCrossorgin = (setupFileDirName) =>
    mergeConfig(createSharedAppConfig(setupFileDirName), {
        plugins: [
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

    return defineConfig({
        plugins: [
            tailwindcss(),
            react({
                include: '**/*.{jsx,tsx}',
            }),
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
            coverage: {
                include: ['src/**/*'],
                exclude: [],
            },
            testTimeout: 15000,
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
                        exclude: [
                            '**/intl.test.ts',
                            '**/node_modules/**',
                            '**/dist/**',
                            '**/.{idea,git,cache,output,temp}/**',
                            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
                        ],
                        setupFiles: setupFileDirName,
                        browser: {
                            headless: false,
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
