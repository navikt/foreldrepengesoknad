const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

const webpackConfig = {
    entry: {
        bundle: ['babel-polyfill', `${__dirname}/../../app/bootstrap.tsx`]
    },
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/[name].js',
        publicPath: '/dist'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {
            app: path.resolve(__dirname, './../../app'),
            common: path.resolve(__dirname, './../../common'),
            shared: path.resolve(__dirname, './../../shared')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('tslint-loader'),
                enforce: 'pre'
            },
            {
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(__dirname, './../../app'),
                    path.resolve(__dirname, './../../common'),
                    path.resolve(__dirname, './../../storage'),
                    path.resolve(__dirname, './../../shared')
                ],
                loader: require.resolve('awesome-typescript-loader')
            },

            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { minimize: true }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                globalVars: {
                                    coreModulePath: '"~"',
                                    nodeModulesPath: '"~"'
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader'
            }
        ]
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].css?[hash]-[chunkhash]-[name]',
            disable: false,
            allChunks: true
        }),
        new SpriteLoaderPlugin({
            plainSprite: true
        }),

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb|nn|en/),
        new webpack.DefinePlugin({
            BUILD: {
                VERSION: JSON.stringify(gitRevisionPlugin.version())
            }
        })
    ]
};

module.exports = webpackConfig;
