/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Checker from 'vite-plugin-checker';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            common: path.resolve(__dirname, './src/common'),
            dev: path.resolve(__dirname, './src/dev'),
        },
    },
    plugins: [react(), Checker({ typescript: true })],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest/setupTests.ts',
        maxConcurrency: 10,
    },
});
