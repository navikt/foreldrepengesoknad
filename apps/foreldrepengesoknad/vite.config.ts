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
    ],
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src/app'),
            'utils-test': path.resolve(__dirname, './src/utils-test'),
            storybook: path.resolve(__dirname, './src/storybook'),
        },
    },
    build: {
        sourcemap: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest/setupTests.ts',
        coverage: {
            include: ['src/**/*'],
            exclude: [],
        },
        maxConcurrency: 10,
        testTimeout: 10000,
    },
});
