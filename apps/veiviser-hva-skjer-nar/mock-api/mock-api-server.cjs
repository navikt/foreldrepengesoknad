const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');

require('dotenv').config();

app.disable('x-powered-by');

const allowCrossDomain = function (req, res, next) {
    const corsWhiteList = ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:8880']; // 8080 dev server with decorator, 8880 dev server without decorator

    if (corsWhiteList.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location');
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};
const delayAllResponses = function (millis) {
    return function (_req, _res, next) {
        setTimeout(next, millis);
    };
};

app.use(allowCrossDomain);
app.use(delayAllResponses(500));
app.use(express.json());
app.use(morgan('tiny'));

app.use('', router);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Mock-api listening on port: ${port}`);
});

router.post('/rest/konto', async (req, res) => {
    try {
        const data = await fetch('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto', {
            method: 'POST',
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
            },
            credentials: 'omit',
            body: JSON.stringify(req.body),
        });
        const jsonResponse = await data.json();
        res.send(jsonResponse);
    } catch (err) {
        console.log(err);
    }
});

router.get('/rest/satser', async (_req, res) => {
    try {
        const data = await fetch('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser', {
            method: 'GET',
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
            },
        });
        const jsonResponse = await data.json();
        res.send(jsonResponse);
    } catch (err) {
        console.log(err);
    }
});
