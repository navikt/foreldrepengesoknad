require('dotenv').config();
const path = require('path');
const mustacheExpress = require('mustache-express');

const configureDevServer = (decoratorFragments, useVTP) => ({
    setupMiddlewares: (middlewares, devServer) => {
        const REST_API_URL = useVTP
            ? process.env.FORELDREPENGESOKNAD_API_URL_VTP
            : process.env.FORELDREPENGESOKNAD_API_URL;
        const LOGINSERVICE_URL = useVTP ? process.env.LOGINSERVICE_URL_VTP : process.env.LOGINSERVICE_URL;
        const FP_UTTAK_SERVICE_URL = useVTP ? process.env.FP_UTTAK_SERVICE_URL_VTP : process.env.FP_UTTAK_SERVICE_URL;

        devServer.app.engine('html', mustacheExpress());
        devServer.app.set('views', `${__dirname}/../../../dist/dev`);
        devServer.app.set('view engine', 'mustache');
        devServer.app.get(['/dist/settings.js'], (_req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`window.appSettings = {
                APP_VERSION: '${process.env.APP_VERSION}',
                REST_API_URL: '${REST_API_URL}',
                UTTAK_API_URL: '${FP_UTTAK_SERVICE_URL}',
                LOGIN_URL: '${LOGINSERVICE_URL}',
                FAMILIE: '${process.env.FAMILIE}',
                FEATURE_VIS_PERIODER_SOM_SENDES_INN:  '${process.env.FEATURE_VIS_PERIODER_SOM_SENDES_INN}',
                FEATURE_VIS_FEILSIDE:  '${process.env.FEATURE_VIS_FEILSIDE}',
                FEATURE_VIS_ALERTSTRIPE:  '${process.env.FEATURE_VIS_ALERTSTRIPE}',
                FEATURE_BRUK_SAKER_V2:  '${process.env.FEATURE_BRUK_SAKER_V2}',
                FEATURE_TEST_EOS_PRAKSISENDRING:  '${process.env.FEATURE_TEST_EOS_PRAKSISENDRING}',
            };`);
        });
        devServer.app.get(/^\/(?!.*dist).*$/, (_req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });

        return middlewares;
    },
    client: {
        logging: 'info',
    },
    devMiddleware: {
        index: true,
        stats: 'minimal',
        publicPath: '/dist',
    },
    static: {
        directory: path.resolve(__dirname, '../../../dist/dev'),
        serveIndex: true,
        watch: true,
    },
});

module.exports = configureDevServer;
