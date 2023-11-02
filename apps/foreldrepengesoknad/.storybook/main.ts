const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: false,
    },
    viteFinal: async (config) => ({
        ...config,
        // @ts-ignore
        plugins: config.plugins?.filter((p) => p?.name !== 'vite-plugin-eslint'),
    }),
};

export default config;
