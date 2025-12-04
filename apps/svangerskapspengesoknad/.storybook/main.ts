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

    async viteFinal(c, { configType }) {
        return mergeConfig(c, {
            base: configType === 'DEVELOPMENT' ? '/svangerskapspenger/soknad' : './',
        });
    },

    staticDirs: ['../../../scripts/mock-service-worker'],
};

export default config;

function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
