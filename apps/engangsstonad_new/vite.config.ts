/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
    ],
    build: {
        sourcemap: true,
    },
    resolve: {
        alias: {
            fpcommon: path.resolve(__dirname, './src/fpcommon'),
            intl: path.resolve(__dirname, './src/intl/'),
            types: path.resolve(__dirname, './src/types/'),
            appData: path.resolve(__dirname, './src/appData/'),
            storybookHelpers: path.resolve(__dirname, './src/storybookHelpers/'),
        },
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
    },
});
