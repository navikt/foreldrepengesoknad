import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

import { storybookMockServiceWorker } from '@navikt/fp-config-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],

    addons: ['@storybook/addon-a11y'],

    framework: {
        name: '@storybook/react-vite',
        options: {},
    },

    async viteFinal(c, { configType }) {
        return mergeConfig(c, {
            base: configType === 'DEVELOPMENT' ? '/svangerskapspenger/soknad' : './',
            plugins: configType === 'PRODUCTION' ? [storybookMockServiceWorker()] : [],
        });
    },
};

export default config;
