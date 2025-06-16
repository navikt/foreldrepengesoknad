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
    ],
    base: '/foreldrepenger/hvor-mye',
    build: {
        sourcemap: true,
    },
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
            utils: path.resolve(__dirname, './src/utils'),
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
        testTimeout: 15000,
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
                        BASE_URL: 'https://test.nav.no',
                    },
                },
            },
        ],
    },
});
