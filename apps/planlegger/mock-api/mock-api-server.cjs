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
    return function (req, res, next) {
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
