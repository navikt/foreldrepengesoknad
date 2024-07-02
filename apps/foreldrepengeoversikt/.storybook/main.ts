const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials'],
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
