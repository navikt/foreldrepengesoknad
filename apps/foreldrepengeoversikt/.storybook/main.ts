const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials', 'storybook-addon-mock'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    staticDirs: ['../mock-service-worker'],
    docs: {
        autodocs: false,
    },
};

export default config;
