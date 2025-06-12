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
    base: '/foreldrepenger/oversikt',
    build: {
        sourcemap: true,
    },
    resolve: {
        alias: {
            storybookData: path.resolve(__dirname, './.storybook/storybook-data'),
        },
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
                    },
                },
            },
            {
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
                    setupFiles: path.resolve(__dirname, './vitest/setupBrowserTests.ts'),
                    browser: {
                        enabled: true,
                        provider: 'playwright',
                        instances: [{ browser: 'chromium' }],
                    },
                    env: {
                        TEST_MODE: 'browser-mode',
                        BASE_URL: 'https://test.com',
                    },
                },
            },
        ],
    },
});
