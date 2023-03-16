const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config.global.js');

webpackConfig.mode = 'development';

webpackConfig.plugins.push(
	new HtmlWebpackPlugin({
		template: './src/app/index.html',
		inject: 'body',
		alwaysWriteToDisk: true
	})
);

webpackConfig.plugins.push(
	new HtmlWebpackHarddiskPlugin({
		outputPath: path.resolve(__dirname, '../../../dist/dev')
	}),
);

module.exports = Object.assign(webpackConfig, {
	devtool: 'inline-source-map'
});
