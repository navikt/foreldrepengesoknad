const webpackConfig = require('./webpack.config.global.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: './src/app/index.html',
        inject: 'body',
    })
);

webpackConfig.optimization = {
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                mangle: true, // Note `mangle.properties` is `false` by default.
                ie8: true,
                keep_classnames: true,
                keep_fnames: true,
            },
        }),
    ],
};

module.exports = webpackConfig;
