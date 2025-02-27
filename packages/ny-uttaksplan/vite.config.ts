/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
    ],
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
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
    },
});
