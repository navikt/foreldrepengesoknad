import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    async viteFinal(c, { configType }) {
        return mergeConfig(c, {
            base: configType === 'DEVELOPMENT' ? '/foreldrepenger/soknad' : './',
        });
    },
    staticDirs: ['../../../scripts/mock-service-worker'],
    docs: {
        autodocs: false,
    },
};

export default config;
