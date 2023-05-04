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
            REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL,
            LOGIN_URL: process.env.LOGINSERVICE_URL,
            APP_VERSION: process.env.APP_VERSION,
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
