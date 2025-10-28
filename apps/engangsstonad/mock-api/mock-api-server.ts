import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';

const FILE_NAME = 'mellomlagretdata.json';

const getFilePath = function () {
    const directories = ['./mock-api/', FILE_NAME];
    return directories.join(path.sep);
};

export const getMellomlagretData = function () {
    if (!fs.existsSync(getFilePath())) {
        return undefined;
    } else {
        try {
            return JSON.parse(fs.readFileSync(getFilePath(), 'utf8'));
        } catch {
            return undefined;
        }
    }
};

export const lagreMellomlagretData = (soknadsdata: any) => {
    fs.writeFileSync(getFilePath(), JSON.stringify(soknadsdata, null, 4));
};

export const deleteMellomlagretData = function () {
    fs.openSync(getFilePath(), 'w');
};

dotenv.config();
const app = express();
const router = express.Router();

const allowCrossDomain = function (_req: any, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location');
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};

const delayAllResponses = function (millsec: number) {
    return (_req: any, _res: any, next: any) => {
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

router.get(['/', '/rest/personinfo'], (_req, res) => {
    res.send(personMock);
});

router.post('/rest/soknad/engangsstonad', (_req, res) => {
    res.send(kvitteringMock);
});

router.get('/rest/storage/engangsstonad', (_req, res) => {
    res.send(getMellomlagretData());
});

router.post('/rest/storage/engangsstonad', (req, res) => {
    lagreMellomlagretData(req.body);
    return res.sendStatus(200);
});

router.delete('/rest/storage/engangsstonad', (_req, res) => {
    deleteMellomlagretData();
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
    // eslint-disable-next-line no-console
    console.log(`Mock-api listening on port: ${port}`);
});
