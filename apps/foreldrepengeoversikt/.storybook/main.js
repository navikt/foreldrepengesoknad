const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const path = require('path');

module.exports = {
    core: {
        builder: 'webpack5',
    },
    features: {
        storyStoreV7: true,
    },
    stories: ['../src/app/**/*.stories.@(ts|tsx)'],
    addons: ['storybook-formik/register'],
    webpackFinal: async (config, { configType }) => {
        config.devtool = 'source-map';

        // Make whatever fine-grained changes you need
        config.module.rules = [
            {
                test: /\.(ts|tsx|js)$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
            },
        ];

        config.plugins.push(
            new CaseSensitivePathsPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css?[fullhash]-[chunkhash]-[contenthash]-[name]',
                linkType: 'text/css',
            }),
            new ESLintPlugin({
                context: path.resolve(__dirname, '../src'),
                extensions: ['tsx', 'ts'],
                failOnWarning: false,
                failOnError: false,
                fix: true,
                // overrideConfigFile: path.resolve(__dirname, '../../../eslintrc.js'),
                lintDirtyModulesOnly: true,
            }),
            new SpriteLoaderPlugin(),
        );

        config.resolve.extensions.push('.ts', '.tsx', '.js', '.json', '.jsx', '.css');
        config.resolve.alias = {
            ...config.resolve.alias,
            app: path.resolve(__dirname, './../src/app'),
            assets: path.resolve(__dirname, './../src/assets'),
        };

        // Return the altered config
        return config;
    },
};
