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
        base: mode === 'development' ? '' : '/foreldrepenger/oversikt',
        build: {
            sourcemap: true,
        },
        resolve: {
            alias: {
                storybookData: path.resolve(__dirname, './.storybook/storybook-data'),
            },
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
