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
        ],
        base: mode === 'development' ? '' : '/foreldrepenger/veivisere',
        build: {
            sourcemap: true,
        },
        resolve: {
            alias: {
                steps: path.resolve(__dirname, './src/steps'),
                components: path.resolve(__dirname, './src/components'),
                appData: path.resolve(__dirname, './src/appData'),
                types: path.resolve(__dirname, './src/types'),
                utils: path.resolve(__dirname, './src/utils'),
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
            testTimeout: 15000,
        },
    };
});
