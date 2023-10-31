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
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src/app'),
            common: path.resolve(__dirname, './src/common/'),
            stories: path.resolve(__dirname, './src/storybook/stories'),
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
    },
});