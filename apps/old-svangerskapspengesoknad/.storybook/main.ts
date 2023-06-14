const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials', 'storybook-addon-react-router-v6'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: false,
    },
    core: {
        builder: '@storybook/builder-vite',
    },
};

export default config;
