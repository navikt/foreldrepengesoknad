const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');
const getDecorator = require('./decorator');
const fsExtra = require('fs-extra');
const path = require('path');

require('dotenv').config();
const settingsFile = path.resolve(`${__dirname}/../../../dist/js/settings.js`);
fsExtra.ensureFile(settingsFile).then((f) => {
    fsExtra.writeFileSync(
        settingsFile,
        `window.appSettings = {
            REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
            LOGIN_URL: '${process.env.LOGINSERVICE_URL}'
        };`
    );
});

getDecorator().then((decoratorData) => {
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(
        compiler,
        configureDevServer(decoratorData)
    );

    server.listen(8080, '127.0.0.1', () =>
        console.log('Started server on http://localhost:8080')
    );
});
