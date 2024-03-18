/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" ');
            },
        },
    ],
    build: {
        sourcemap: true,
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src/app'),
            storybook: path.resolve(__dirname, './src/storybook'),
            assets: path.resolve(__dirname, './src/assets'),
        },
    },
    server: {
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
        testTimeout: 10000,
    },
});
