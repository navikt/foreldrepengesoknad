const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');

require('dotenv').config();

webpackConfig.entry = {
    reload: 'webpack-dev-server/client?http://localhost:8880/',
    ...webpackConfig.entry,
};

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(configureDevServer({}), compiler);

server.listen(8880, '0.0.0.0', () => console.log('Started server on http://localhost:8880'));
