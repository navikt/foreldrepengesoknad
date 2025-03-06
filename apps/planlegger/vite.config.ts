import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
    ],
    base: '/foreldrepenger/planlegger',
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
            steps: path.resolve(__dirname, './src/steps'),
            components: path.resolve(__dirname, './src/components'),
            appData: path.resolve(__dirname, './src/app-data'),
            types: path.resolve(__dirname, './src/types'),
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
        environment: 'jsdom',
        setupFiles: './vitest/setupTests.ts',
        deps: {
            inline: ['@navikt/ds-react'],
        },
        coverage: {
            include: ['src/**/*'],
            exclude: [],
        },
        testTimeout: 15000,
    },
});
