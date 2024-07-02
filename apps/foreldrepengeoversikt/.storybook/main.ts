const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials', 'storybook-addon-mock'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    staticDirs: ['../public'],
    docs: {
        autodocs: false,
    },
};

export default config;
