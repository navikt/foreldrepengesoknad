import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
    ],
    build: {
        sourcemap: true,
    },
    resolve: {
        alias: {
            styles: path.resolve(__dirname, './src/styles'),
            intl: path.resolve(__dirname, './src/intl/'),
            types: path.resolve(__dirname, './src/types/'),
            appData: path.resolve(__dirname, './src/appData/'),
            storybookHelpers: path.resolve(__dirname, './src/storybookHelpers/'),
        },
    },
});
