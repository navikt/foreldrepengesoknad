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
