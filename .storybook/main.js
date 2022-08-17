const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
    core: {
        builder: 'webpack5',
    },
    features: {
        storyStoreV7: true,
    },
    stories: ['../src/storybook/stories/**/*.stories.tsx'],
    addons: ['@storybook/addon-essentials', 'storybook-formik/register'],
    webpackFinal: async (config, { configType }) => {
        //Fjern default svg-loader
        config.module.rules = config.module.rules.map((data) => {
            if (/svg\|/.test(String(data.test))) {
                data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
            }
            return data;
        });

        config.devtool = 'source-map';

        // Make whatever fine-grained changes you need
        config.module.rules = config.module.rules.concat(
            {
                test: /\.(ts|tsx|js)$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: { loader: 'svg-sprite-loader', options: {} },
            }
        );

        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
            }),
            new ESLintPlugin({
                context: path.resolve(__dirname, '../src'),
                extensions: ['tsx', 'ts'],
                failOnWarning: false,
                failOnError: false,
                fix: true,
                overrideConfigFile: path.resolve(__dirname, '../eslintrc.js'),
                lintDirtyModulesOnly: true,
            })
        );

        config.resolve.extensions.push('.ts', '.tsx', '.less');
        config.resolve.alias = {
            ...config.resolve.alias,
            app: path.resolve(__dirname, './../src/app'),
            uttaksplan: path.resolve(__dirname, './../src/uttaksplan'),
        };

        // Return the altered config
        return config;
    },
};
