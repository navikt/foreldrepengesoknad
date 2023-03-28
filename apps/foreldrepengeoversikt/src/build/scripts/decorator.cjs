const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

const requestDecorator = (callback) => {
    const baseUrl = process.env.APPRES_CMS_URL;
    return request(`${baseUrl}/`, callback);
};

const getDecorator = () =>
    new Promise((resolve) => {
        const callback = (error, response, body) => {
            if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                const { document } = new JSDOM(body).window;
                const prop = 'innerHTML';

                const data = {
                    NAV_SCRIPTS: document.getElementById('scripts')[prop],
                    NAV_STYLES: document.getElementById('styles')[prop],
                    NAV_HEADING: document.getElementById('header-withmenu')[prop],
                    NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
                    NAV_MEGAMENU_RESOURCES: document.getElementById('megamenu-resources')[prop],
                    APP_SETTINGS: JSON.stringify({
                        FORELDREPENGESOKNAD_API_URL: `${process.env.FORELDREPENGESOKNAD_API_URL}`,
                        LOGINSERVICE_URL: `${process.env.LOGINSERVICE_URL}`,
                        FP_UTTAK_SERVICE_URL: `${process.env.FP_UTTAK_SERVICE_URL}`,
                        APPRES_CMS_URL: `${process.env.APPRES_CMS_URL}`,
                        KLAGE_URL: `${process.env.KLAGE_URL}`,
                    }),
                };
                resolve(data);
            } else {
                console.log('Failed to get decorator. Exiting node.');
                console.log(error);
                process.exit(1);
            }
        };

        requestDecorator(callback);
    });

module.exports = getDecorator;
