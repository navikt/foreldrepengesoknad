const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');
const path = require('path');
const createEnvSettingsFile = require('./envSettings');

require('dotenv').config();

createEnvSettingsFile(path.resolve(`${__dirname}/../../../dist/js/settings.js`));

webpackConfig.entry = {
    reload: 'webpack-dev-server/client?http://localhost:8080/',
    ...webpackConfig.entry,
};

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(
    compiler,
    configureDevServer({
        NAV_SCRIPTS: '',
        NAV_STYLES: '',
        NAV_HEADING: '',
        NAV_FOOTER: '',
    })
);

server.listen(8080, '0.0.0.0', () => console.log('Started server on http://localhost:8080'));
