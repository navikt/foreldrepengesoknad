require('dotenv').config();
const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;
const requestDecorator = (callback) => {
    const baseUrl = process.env.APPRES_CMS_URL;
    return request(`${baseUrl}/?simple=true`, callback);
};

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
            if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                console.log('Extracting decorator fragments');
                const { document } = new JSDOM(body).window;
                const prop = 'innerHTML';

                const data = {
                    NAV_SCRIPTS: document.getElementById('scripts')[prop],
                    NAV_STYLES: document.getElementById('styles')[prop],
                    NAV_HEADING: document.getElementById('header-withmenu')[prop],
                    NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
                };
                resolve(data);
            } else {
                console.log('Failed to get decorator. Exiting node.');
                process.exit(1);
            }
        };

        requestDecorator(callback);
    });

module.exports = getDecorator;
