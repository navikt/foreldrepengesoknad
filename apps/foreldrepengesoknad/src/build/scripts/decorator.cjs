const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

const requestDecorator = (callback) => {
    const baseUrl = process.env.APPRES_CMS_URL;
    return request(`${baseUrl}/?simple=true`, callback);
};

const extractDecoratorFragments = (html) => {
    const { document } = new JSDOM(html).window;
    const prop = 'innerHTML';

    return {
        NAV_SCRIPTS: document.getElementById('scripts')[prop],
        NAV_STYLES: document.getElementById('styles')[prop],
        NAV_HEADING: document.getElementById('header-withmenu')[prop],
        NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
        APP_SETTINGS: JSON.stringify({
            FORELDREPENGESOKNAD_API_URL: `${process.env.FORELDREPENGESOKNAD_API_URL}`,
            LOGINSERVICE_URL: `${process.env.LOGINSERVICE_URL}`,
            FP_UTTAK_SERVICE_URL: `${process.env.FP_UTTAK_SERVICE_URL}`,
            APPRES_CMS_URL: `${process.env.APPRES_CMS_URL}`,
            FORELDREPENGESOKNAD_API_URL_VTP: `${process.env.FORELDREPENGESOKNAD_API_URL_VTP}`,
            LOGINSERVICE_URL_VTP: `${process.env.LOGINSERVICE_URL_VTP}`,
            FP_UTTAK_SERVICE_URL_VTP: `${process.env.FP_UTTAK_SERVICE_URL_VTP}`,
            FAMILIE: `${process.env.FAMILIE}`,
            FEATURE_VIS_FEILSIDE: `${process.env.FEATURE_VIS_FEILSIDE}`,
            FEATURE_VIS_ALERTSTRIPE: `${process.env.FEATURE_VIS_ALERTSTRIPE}`,
            FEATURE_VIS_PERIODER_SOM_SENDES_INN: `${process.env.FEATURE_VIS_PERIODER_SOM_SENDES_INN}`,
            FEATURE_WLB_GJELDER_FRA_FORSTE_JAN: `${process.env.FEATURE_WLB_GJELDER_FRA_FORSTE_JAN}`,
            APP_VERSION: `${process.env.APP_VERSION}`,
            IS_TEST: `${process.env.IS_TEST}`,
        }),
    };
};

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
            if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                resolve(extractDecoratorFragments(body));
            } else {
                try {
                    console.log(error);
                    console.log('Failed to get decorator. Exiting node.');
                    process.exit(1);
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            }
        };
        requestDecorator(callback);
    });

module.exports = getDecorator;
