/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), Checker({ typescript: true })],
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
});
