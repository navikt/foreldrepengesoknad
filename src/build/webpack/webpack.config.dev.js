const path = require('path');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config.global.js');

require('dotenv').config();

webpackConfig.mode = 'development';

webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: './src/app/index.html',
        inject: 'body',
        alwaysWriteToDisk: true
    }),
    new webpack.DefinePlugin({
        appSettings: {
            REST_API_URL: JSON.stringify(
                process.env.FORELDREPENGESOKNAD_API_URL
            ),
            LOGIN_URL: JSON.stringify(process.env.LOGINSERVICE_URL)
        }
    })
);

webpackConfig.plugins.push(
    new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, '../../../dist/dev')
    })
);

module.exports = Object.assign(webpackConfig, {
    devtool: 'inline-source-map'
});
