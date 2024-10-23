import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

import viteConfig from '../vite.config';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    async viteFinal(c) {
        return mergeConfig(c, {
            base: viteConfig.base,
        });
    },
    staticDirs: ['../../../scripts/mock-service-worker'],
    docs: {
        autodocs: false,
    },
};

export default config;
