const path = require('path');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const webpackConfig = {
    entry: ['babel-polyfill', './src/app/bootstrap.tsx'],
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/bundle.js',
        publicPath: '/engangsstonad/dist',
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            app: path.resolve(__dirname, './../../app/'),
            assets: path.resolve(__dirname, './../../app/assets/'),
            components: path.resolve(__dirname, './../../app/components/'),
            styles: path.resolve(__dirname, './../../app/styles/'),
            util: path.resolve(__dirname, './../../app/util/'),
            common: path.resolve(__dirname, './../../common/'),
            intl: path.resolve(__dirname, './../../app/intl/'),
        },
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
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
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[fullhash]-[chunkhash]-[contenthash]-[name]',
        }),
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(process.env.NODE_ENV),
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            failOnWarning: false,
        }),
    ],
};

module.exports = webpackConfig;
