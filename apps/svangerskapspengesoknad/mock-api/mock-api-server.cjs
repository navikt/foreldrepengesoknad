const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const MockStorage = require('./mock-storage.cjs');

app.disable('x-powered-by');

const allowCrossDomain = function (_req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
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

router.get(['/rest/sokerinfo'], (_req, res) => {
    res.send(MockStorage.getSokerInfo());
});

router.post('/rest/soknad', (_req, res) => {
    return res.send(MockStorage.getSoknadSendt());
});

router.get('/rest/storage/svangerskapspenger', (_req, res) => {
    res.send(MockStorage.getMellomlagretData());
});

router.post('/rest/storage/svangerskapspenger', (req, res) => {
    MockStorage.lagreMellomlagretData(req.body);
    return res.sendStatus(200);
});

router.delete('/rest/storage/svangerskapspenger', (_req, res) => {
    MockStorage.deleteMellomlagretData();
    return res.sendStatus(200);
});

const vedleggUpload = multer({ dest: './dist/vedlegg/' });

router.post('/rest/storage/svangerskapspenger/vedlegg', vedleggUpload.single('vedlegg'), (req, res) => {
    res.setHeader('Location', `http://localhost:8080/foreldrepengesoknad/dist/vedlegg/${req.body.id}`);
    res.sendStatus(201);
});

router.delete('/rest/storage/svangerskapspenger/vedlegg/:id', (_req, res) => {
    res.sendStatus(204);
});

app.use('', router);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Mock-api listening on port: ${port}`);
});
