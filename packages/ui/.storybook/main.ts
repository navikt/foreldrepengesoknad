import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const config = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [getAbsolutePath('@storybook/addon-links'), getAbsolutePath('storybook-react-intl')],
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },
};

export default config;

function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
