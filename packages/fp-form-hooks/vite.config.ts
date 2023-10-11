/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Checker from 'vite-plugin-checker';
import { dependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), Checker({ typescript: true })],
    build: {
        lib: {
            name: '@navikt/fp-form-hooks',
            entry: 'index.ts',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
        sourcemap: true,
        rollupOptions: {
            external: Object.keys(dependencies),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest/setupTests.ts',
        deps: {
            inline: ['@navikt/ds-react'],
        },
    },
});
