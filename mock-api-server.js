const express = require('express');
const app = express();
const router = express.Router();
const contextPath = '/foreldrepengesoknad-api';
const multer = require('multer');
const MockStorage = require('./mock-storage');

require('dotenv').config();

const mockArbeidsforhold = {
    arbeidsgiverNavn: 'NAV',
    arbeidsgiverId: '974652250',
    arbeidsgiverIdType: 'orgnr',
    fom: new Date(2018, 1, 1),
    tom: undefined,
    stillingsprosent: 100
};

const mockResponse = {
    søker: {
        fnr: '11111111111',
        fornavn: 'HENRIKKE',
        etternavn: 'IBSEN',
        kjønn: 'K',
        fødselsdato: '1979-01-28',
        ikkeNordiskEøsLand: true
    },
    arbeidsforhold: [mockArbeidsforhold]
};

const allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type,X-XSRF-TOKEN,Location'
    );
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};
const delayAllResponses = function(millis) {
    return function(req, res, next) {
        setTimeout(next, millis);
    };
};

app.use(allowCrossDomain);
app.use(delayAllResponses(500));
app.use(express.json());

router.get(['/rest/sokerinfo'], (req, res) => {
    res.send(mockResponse);
});

router.get(['/rest/sokerinfo'], (req, res) => {
    res.send(mockResponse);
});

router.post('/rest/engangsstonad', (req, res) => res.sendStatus(200));

router.get('/rest/storage', (req, res) => {
    res.send(MockStorage.getSoknad());
});
router.post('/rest/storage', (req, res) => {
    MockStorage.updateSoknad(req.body);
    return res.sendStatus(200);
});

const vedleggUpload = multer({ dest: './dist/vedlegg/' });
router.post(
    '/rest/storage/vedlegg',
    vedleggUpload.single('vedlegg'),
    (req, res) => {
        res.setHeader(
            'Location',
            `http://localhost:8080/foreldrepengesoknad/dist/vedlegg/${
                req.body.id
            }`
        );
        res.sendStatus(201);
    }
);

router.delete('/rest/storage/vedlegg/:id', (req, res) => {
    res.sendStatus(204);
});

app.use(contextPath + '/', router);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Mock-api listening on port: ${port}`);
});

const logError = (errorMessage, details) => console.log(errorMessage, details);
