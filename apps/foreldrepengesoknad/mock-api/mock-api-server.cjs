const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const MockStorage = require('./mock-storage.cjs');

app.disable('x-powered-by');

const allowCrossDomain = function (_req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location,Fnr');
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

router.post('/rest/engangsstonad', (_req, res) => res.sendStatus(200));

router.get('/rest/storage/foreldrepenger', (_req, res) => {
    res.send(MockStorage.getSoknad());
});

router.get('/rest/innsyn/v2/saker', (_req, res) => {
    res.send(MockStorage.getSaker());
});

router.post('/rest/innsyn/v2/annenPartVedtak', (_req, res) => {
    res.send(MockStorage.getAnnenPartVedtak());
});

router.get('/rest/innsyn/uttaksplan', (_req, res) => {
    res.send(MockStorage.getUttaksplan());
});

router.get('/rest/innsyn/uttaksplanannen', (_req, res) => {
    res.send(MockStorage.getUttaksplanannen());
});

router.get('/rest/konto', (req, res) => {
    res.send(MockStorage.getStønadskontoer(req.query.dekningsgrad === '100'));
});

router.post('/rest/storage/foreldrepenger', (req, res) => {
    MockStorage.updateSoknad(req.body);
    return res.sendStatus(200);
});

router.delete('/rest/storage/foreldrepenger', (_req, res) => {
    MockStorage.deleteSoknad();
    return res.sendStatus(200);
});

router.post('/rest/soknad', (_req, res) => {
    return res.send(MockStorage.getSoknadSendt());
});

router.post('/rest/soknad/endre', (_req, res) => {
    return res.send(MockStorage.getSoknadSendt());
});

router.delete('/rest/storage/foreldrepenger', (_req, res) => {
    res.sendStatus(204);
});

const vedleggUpload = multer({
    dest: './dist/vedlegg/',
});
router.post('/rest/storage/foreldrepenger/vedlegg', vedleggUpload.single('vedlegg'), (req, res) => {
    res.setHeader('Location', `http://localhost:8080/foreldrepengesoknad/dist/vedlegg/${req.body.id}`);
    res.sendStatus(201);
});

router.delete('/rest/storage/foreldrepenger/vedlegg', (_req, res) => {
    MockStorage.deleteSoknad();
    return res.sendStatus(200);
});

app.use('', router);

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Mock-api listening on port: ${port}`);
});
