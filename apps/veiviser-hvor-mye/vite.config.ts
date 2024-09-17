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
        base: mode === 'development' ? '' : '/foreldrepenger/hvor-mye',
        build: {
            sourcemap: true,
        },
        resolve: {
            alias: {
                appData: path.resolve(__dirname, './src/app-data'),
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
