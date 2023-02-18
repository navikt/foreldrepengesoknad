const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');

require('dotenv').config();

webpackConfig.entry = {
    reload: 'webpack-dev-server/client?http://localhost:8080/',
    ...webpackConfig.entry,
};

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(configureDevServer({}, true), compiler);

server.startCallback(() => {
    console.log('Successfully started server on http://localhost:8080');
});
