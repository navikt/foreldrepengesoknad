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
            app: path.resolve(__dirname, './src/app'),
            uttaksplan: path.resolve(__dirname, './src/uttaksplan'),
            assets: path.resolve(__dirname, './src/app/assets/'),
            components: path.resolve(__dirname, './src/app/components/'),
            styles: path.resolve(__dirname, './src/app/styles/'),
            util: path.resolve(__dirname, './src/app/util/'),
            common: path.resolve(__dirname, './src/common/'),
            intl: path.resolve(__dirname, './src/app/intl/'),
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
