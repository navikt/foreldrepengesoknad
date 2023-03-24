import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx,js,ts}',
        }),
    ],
    build: {
        outDir: '../../dist',
        commonjsOptions: {
            include: [/fp-common/],
        },
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src/app'),
            assets: path.resolve(__dirname, './src/assets'),
        },
    },
    optimizeDeps: {
        include: ['fp-common'],
    },
});
