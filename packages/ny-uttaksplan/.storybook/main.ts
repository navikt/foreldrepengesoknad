const config = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    addons: ['@storybook/addon-viewport'],
};

export default config;
