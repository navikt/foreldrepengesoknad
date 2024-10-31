/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
    return {
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
                types: path.resolve(__dirname, './src/types/'),
                utils: path.resolve(__dirname, './src/utils/'),
            },
        },
        base: mode === 'development' ? '' : '/svangerskapspenger/soknad',
        build: {
            sourcemap: true,
        },
        server: {
            port: 8080,
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './vitest/setupTests.ts',
            coverage: {
                include: ['src/**/*'],
                exclude: [],
            },
            testTimeout: 10000,
        },
    };
});
