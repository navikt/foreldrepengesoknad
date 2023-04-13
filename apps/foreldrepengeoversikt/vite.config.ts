import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
    ],
    build: {
        sourcemap: true,
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src/app'),
            storybook: path.resolve(__dirname, './src/storybook'),
            assets: path.resolve(__dirname, './src/assets'),
        },
    },
    optimizeDeps: {
        include: ['@navikt/fp-common'],
    },
    server: {
        port: 8080,
    },
});
