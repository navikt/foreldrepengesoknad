const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    staticDirs: ['../../../scripts/mock-service-worker'],
    docs: {
        autodocs: false,
    },
};

export default config;
