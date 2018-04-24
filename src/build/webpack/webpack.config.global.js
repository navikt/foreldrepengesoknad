const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const webpackConfig = {
  entry: ['babel-polyfill', './src/app/bootstrap.tsx'],
  output: {
    path: path.resolve(__dirname, './../../../dist'),
    filename: 'js/bundle.js',
    publicPath: '/foreldrepengesoknad/dist'
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './../../app/assets/'),
      components: path.resolve(__dirname, './../../app/components/'),
      containers: path.resolve(__dirname, './../../app/containers/'),
      actions: path.resolve(__dirname, './../../app/redux/actions/'),
      reducers: path.resolve(__dirname, './../../app/redux/reducers'),
      styles: path.resolve(__dirname, './../../app/styles/'),
      util: path.resolve(__dirname, './../../app/util/')
    },
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
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
        include: [path.resolve(__dirname, './../../app')],
        loader: require.resolve('ts-loader')
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
              loader: 'css-loader'
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
    new ExtractTextPlugin({
      filename: 'css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
      disable: false,
      allChunks: true
    }),
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

module.exports = webpackConfig;
