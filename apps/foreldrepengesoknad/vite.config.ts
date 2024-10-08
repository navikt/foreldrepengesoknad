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
                pages: path.resolve(__dirname, './src/pages'),
                steps: path.resolve(__dirname, './src/steps'),
                utils: path.resolve(__dirname, './src/utils'),
                api: path.resolve(__dirname, './src/api'),
                types: path.resolve(__dirname, './src/types'),
                storybookData: path.resolve(__dirname, '.storybook/testData'),
            },
        },
        base: mode === 'development' ? '' : '/foreldrepenger/soknad',
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
    };
});
