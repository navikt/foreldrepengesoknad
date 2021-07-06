const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ['../src/storybook/stories/**/*.stories.@(tsx)'],
  addons: ['@storybook/addon-essentials', 'storybook-formik/register'],
  webpackFinal: async (config, { configType }) => {
    //Fjern default svg-loader
    config.module.rules = config.module.rules.map( data => {
      if (/svg\|/.test(String(data.test))) {
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
      }
      return data;
    });

    config.devtool = 'eval-cheap-source-map';

    //TODO Dette er ein temp fiks... kan sikkert fjernast når storybook/webpack kjem i nye versjonar
    config.cache = false;

    // Make whatever fine-grained changes you need
    config.module.rules = config.module.rules.concat({
      test: /\.(tsx?|ts?)$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        failOnWarning: false,
        failOnError: false,
        configFile: path.resolve(__dirname, '../.eslintrc.js'),
        fix: true,
        cache: true,
      },
      include: [path.resolve(__dirname, '../src')],
    }, {
      test: /\.(ts|tsx|js)$/,
      use: [{ loader: 'babel-loader' }],
      exclude: /node_modules/,
    }, {
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
    }, {
      test: /\.svg$/,
      use: { loader: 'svg-sprite-loader', options: {} },
    });

    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
    }));
    
    config.resolve.extensions.push('.ts', '.tsx', '.less');
    config.resolve.alias = {
        ...config.resolve.alias,
        app: path.resolve(__dirname, './../src/app'),
        uttaksplan: path.resolve(__dirname, './../src/uttaksplan'),
    }

    // Return the altered config
    return config;
  },
}