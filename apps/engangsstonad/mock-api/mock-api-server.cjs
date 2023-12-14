const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const MockStorage = require('./mock-storage.cjs');

const allowCrossDomain = function (_req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location');
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};

const delayAllResponses = function (millsec) {
    return function (_req, _res, next) {
        setTimeout(next, millsec);
    };
};

app.use(allowCrossDomain);
app.use(delayAllResponses(500));
app.use(express.json());

const personMock = {
    fnr: '11111111111',
    fornavn: 'Henrikke',
    etternavn: 'Ibsen',
    kjønn: 'K',
    fødselsdato: '1979-01-28',
    bankkonto: {
        kontonummer: '49875234987',
        banknavn: 'Storebank',
    },
};

const kvitteringMock = {
    mottattDato: '2019-02-19T13:40:45.115',
    referanseId: '3959c880-83d2-4f01-b107-035fa7693758',
    leveranseStatus: 'PÅ_VENT',
    journalId: '439772941',
};

router.get(['/', '/rest/personinfo?'], (_req, res) => {
    res.send(personMock);
});

router.post('/rest/soknad/engangssoknad', (_req, res) => {
    res.send(kvitteringMock);
});

router.get('/rest/storage/engangsstonad', (_req, res) => {
    res.send(MockStorage.getMellomlagretData());
});

router.post('/rest/storage/engangsstonad', (req, res) => {
    MockStorage.lagreMellomlagretData(req.body);
    return res.sendStatus(200);
});

router.delete('/rest/storage/engangsstonad', (_req, res) => {
    MockStorage.deleteMellomlagretData();
    return res.sendStatus(200);
});

router.post('/rest/storage/engangsstonad/vedlegg', (req, res) => {
    res.setHeader('Location', `http://localhost:8080/engangsstonad/dist/vedlegg/${req.body.id}`);
    res.sendStatus(201);
});

router.delete('/rest/storage/engangsstonad/vedlegg', (_req, res) => {
    res.sendStatus(204);
});

app.use('', router);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Mock-api listening on port: ${port}`);
});
