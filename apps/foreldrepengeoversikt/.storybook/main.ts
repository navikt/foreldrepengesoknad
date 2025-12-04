import type { StorybookConfig } from '@storybook/react-vite';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],

    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },

    /**
     * Når vi kjører lokalt trenger vi samme "base" som i Vite config for mocking endepunktene.
     * Det trenger vi ikke i deployed versjon da /foreldrepenger/oversikt allerede er i URL.
     * Lokal-kjøring er uten en slik subpath, derfor må den settes her.
     */
    async viteFinal(c, { configType }) {
        return mergeConfig(c, {
            base: configType === 'DEVELOPMENT' ? '/foreldrepenger/oversikt' : './',
        });
    },

    staticDirs: ['../../../scripts/mock-service-worker'],
};

export default config;

function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
