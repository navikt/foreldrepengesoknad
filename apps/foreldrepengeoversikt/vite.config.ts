import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{ts,tsx}',
        }),
    ],
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src/app'),
            assets: path.resolve(__dirname, './src/assets'),
        },
    },
    optimizeDeps: {
        include: ['@navikt/fp-common'],
    },
});
