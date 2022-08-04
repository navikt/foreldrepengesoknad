require('dotenv').config();
const mustacheExpress = require('mustache-express');

const configureDevServer = (decoratorFragments) => ({
    onBeforeSetupMiddleware: (devServer) => {
        devServer.app.engine('html', mustacheExpress());
        devServer.app.set('views', `${__dirname}/../../../dist/dev`);
        devServer.app.set('view engine', 'mustache');
        devServer.app.get(['/dist/settings.js'], (_req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`window.appSettings = {
                APP_VERSION: '${process.env.APP_VERSION}',
                REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
                UTTAK_API_URL: '${process.env.FP_UTTAK_SERVICE_URL}',
                LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
                FAMILIE: '${process.env.FAMILIE}',
                FEATURE_VIS_PERIODER_SOM_SENDES_INN:  '${process.env.FEATURE_VIS_PERIODER_SOM_SENDES_INN}',
                FEATURE_VIS_FEILSIDE:  '${process.env.FEATURE_VIS_FEILSIDE}',
                FEATURE_VIS_ALERTSTRIPE:  '${process.env.FEATURE_VIS_ALERTSTRIPE}',
                FEATURE_TEST_WLB_REGLER: '${process.env.FEATURE_TEST_WLB_REGLER}',
            };`);
        });
        devServer.app.get(/^\/(?!.*dist).*$/, (_req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });
    },
    liveReload: false,
    hot: true,
    devMiddleware: {
        index: true,
        stats: 'minimal',
        publicPath: '/dist',
    },
    static: {
        directory: '/dist',
        serveIndex: true,
        watch: true,
    },
});

module.exports = configureDevServer;
