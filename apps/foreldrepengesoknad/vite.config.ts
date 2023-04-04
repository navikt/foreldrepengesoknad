/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
    ],
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src/app'),
            uttaksplan: path.resolve(__dirname, './src/uttaksplan'),
            'utils-test': path.resolve(__dirname, './src/utils-test'),
            stories: path.resolve(__dirname, './src/storybook/stories'),
            storybook: path.resolve(__dirname, './src/storybook'),
        },
    },
    build: {
        sourcemap: true,
    },
    optimizeDeps: {
        include: ['@navikt/fp-common'],
    },
    server: {
        port: 8080,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest/setupTests.ts',
        deps: { inline: ['@navikt/ds-react'] },
    },
});
