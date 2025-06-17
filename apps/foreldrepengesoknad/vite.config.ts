/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{jsx,tsx}',
        }),
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
            },
        },
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    resolve: {
        alias: {
            appData: path.resolve(__dirname, './src/app-data'),
            pages: path.resolve(__dirname, './src/pages'),
            steps: path.resolve(__dirname, './src/steps'),
            utils: path.resolve(__dirname, './src/utils'),
            api: path.resolve(__dirname, './src/api'),
            types: path.resolve(__dirname, './src/types'),
            storybookData: path.resolve(__dirname, '.storybook/testData'),
        },
    },
    base: '/foreldrepenger/soknad',
    build: {
        sourcemap: true,
    },
    server: {
        // Whitelist dev.nav.no for bruk med "vite-mode"
        cors: {
            origin: ['https://www.intern.dev.nav.no', new RegExp('^http://localhost:')],
        },
        port: 8080,
    },
    test: {
        globals: true,
        coverage: {
            include: ['src/**/*'],
            exclude: [],
        },
        testTimeout: 10000,
        maxConcurrency: 10,
        deps: {
            inline: ['@navikt/ds-react'],
        },
        projects: [
            {
                extends: true,
                test: {
                    name: 'jsdom',
                    environment: 'jsdom',
                    css: false,
                    setupFiles: path.resolve(__dirname, './vitest/setupTests.ts'),
                    env: {
                        TEST_MODE: 'jsdom-mode',
                        BASE_URL: 'https://test.nav.no',
                    },
                },
            },
            {
                extends: true,
                test: {
                    name: 'browser',
                    exclude: [
                        '**/useSendSøknad.test.tsx',
                        '**/intl.test.ts',
                        '**/node_modules/**',
                        '**/dist/**',
                        '**/.{idea,git,cache,output,temp}/**',
                        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
                    ],
                    setupFiles: path.resolve(__dirname, './vitest/setupBrowserTests.ts'),
                    browser: {
                        enabled: true,
                        provider: 'playwright',
                        instances: [{ browser: 'chromium' }],
                    },
                    env: {
                        TEST_MODE: 'browser-mode',
                        BASE_URL: 'https://test.nav.no',
                    },
                },
            },
        ],
    },
});
