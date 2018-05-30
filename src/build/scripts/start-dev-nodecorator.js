const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');
const fsExtra = require('fs-extra');
const path = require('path');

require('dotenv').config();

webpackConfig.entry = {
    reload: 'webpack-dev-server/client?http://localhost:8080/',
    ...webpackConfig.entry
};

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

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(
    compiler,
    configureDevServer({
        NAV_SCRIPTS: '',
        NAV_STYLES: '',
        NAV_HEADING: '',
        NAV_FOOTER: ''
    })
);

server.listen(8080, '0.0.0.0', () =>
    console.log('Started server on http://localhost:8080')
);
