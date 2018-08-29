require('dotenv').config();
const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

const requestDecorator = (callback) =>
    request(
        `${process.env.APPRES_CMS_URL}/common-html/v4/navno?header=true&styles=true&scripts=true&footer=true`,
        callback
    );

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
            if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                const { document } = new JSDOM(body).window;
                const prop = 'innerHTML';

                const data = {
                    NAV_SCRIPTS: document.getElementById('scripts')[prop],
                    NAV_STYLES: document.getElementById('styles')[prop],
                    NAV_HEADING: document.getElementById('header')[prop],
                    NAV_FOOTER: document.getElementById('footer')[prop]
                };
                resolve(data);
            } else {
                console.log(error);
                reject(new Error(error));
            }
        };

        requestDecorator(callback);
    });

module.exports = getDecorator;
