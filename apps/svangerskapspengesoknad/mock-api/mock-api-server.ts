/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';

const MELLOMLAGRET_DATA_FILNAVN = 'mellomlagretdata.json';

const getFilePath = (filnavn: string) => {
    const directories = ['mock-api', 'mock_data', filnavn];
    return directories.join(path.sep);
};

const getFilePathMellomlagretData = () => {
    const directories = ['mock-api', MELLOMLAGRET_DATA_FILNAVN];
    return directories.join(path.sep);
};

export const updateSoknad = (soknadsdata: any) => {
    const fileName = getFilePath('soknad.json');
    fs.writeFileSync(fileName, JSON.stringify(soknadsdata, null, 4));
};

export const getSoknad = () => {
    const fileName = getFilePath('soknad.json');
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (err) {
            return {};
        }
    }
};

export const getSokerInfo = () => {
    const fileName = getFilePath('sokerinfo.json');
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (err) {
            return {};
        }
    }
};

export const getSoknadSendt = () => {
    const fileName = getFilePath('soknad_sendt.json');
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (err) {
            return {};
        }
    }
};

export const getMellomlagretData = () => {
    const fileName = getFilePathMellomlagretData();
    if (!fs.existsSync(fileName)) {
        return undefined;
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (err) {
            return undefined;
        }
    }
};

export const lagreMellomlagretData = (soknadsdata: any) => {
    fs.writeFileSync(getFilePathMellomlagretData(), JSON.stringify(soknadsdata, null, 4));
};

export const deleteMellomlagretData = () => {
    fs.openSync(getFilePathMellomlagretData(), 'w');
};

const app = express();
const router = express.Router();

app.disable('x-powered-by');

const allowCrossDomain = function (_req: any, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location');
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};
const delayAllResponses = function (millis: number) {
    return function (_req: any, _res: any, next: any) {
        setTimeout(next, millis);
    };
};

app.use(allowCrossDomain);
app.use(delayAllResponses(500));
app.use(express.json());

router.get(['/rest/sokerinfo'], (_req, res) => {
    res.send(getSokerInfo());
});

router.post('/rest/soknad/svangerskapspenger', (_req, res) => {
    return res.send(getSoknadSendt());
});

router.get('/rest/storage/svangerskapspenger', (_req, res) => {
    res.send(getMellomlagretData());
});

router.post('/rest/storage/svangerskapspenger', (req, res) => {
    lagreMellomlagretData(req.body);
    return res.sendStatus(200);
});

router.delete('/rest/storage/svangerskapspenger', (_req, res) => {
    deleteMellomlagretData();
    return res.sendStatus(200);
});

router.delete('/rest/storage/svangerskapspenger/vedlegg/:id', (_req, res) => {
    res.sendStatus(204);
});

app.use('', router);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Mock-api listening on port: ${port}`);
});
