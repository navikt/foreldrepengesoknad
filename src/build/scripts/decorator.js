const jsdom = require('jsdom');
const request = require('request');
const fs = require('fs-extra');

const { JSDOM } = jsdom;

const requestDecorator = (callback) => {
    const baseUrl = process.env.APPRES_CMS_URL;
    return request(`${baseUrl}/common-html/v4/navno?header=true&styles=true&scripts=true&footer=true`, callback);
};

const loadFallbackDecorator = () => {
    console.log('Attempt to load fallback decorator');
    try {
        return fs.readFileSync('fallback-decorator.html', 'utf8');
    } catch (err) {
        console.log(err);
        return undefined;
    }
};

const extractDecoratorFragments = (html) => {
    console.log('Extracting decorator fragments', html);
    const { document } = new JSDOM(html).window;
    const prop = 'innerHTML';

    return {
        NAV_SCRIPTS: document.getElementById('scripts')[prop],
        NAV_STYLES: document.getElementById('styles')[prop],
        NAV_HEADING: document.getElementById('header-withmenu')[prop],
        NAV_FOOTER: document.getElementById('footer-withmenu')[prop]
    };
};

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
            if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                resolve(extractDecoratorFragments(body));
            } else {
                try {
                    resolve(extractDecoratorFragments(loadFallbackDecorator()));
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            }
        };
        requestDecorator(callback);
    });

module.exports = getDecorator;
