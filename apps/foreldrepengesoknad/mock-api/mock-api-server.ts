import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';

const MELLOMLAGRET_DATA_FILNAVN = 'mellomlagretdata.json';

const getFilePath = (filnavn: string) => {
    const directories = ['./mock-api/', 'mock_data', filnavn];
    return directories.join(path.sep);
};

const getFilePathMellomlagretData = () => {
    const directories = ['./mock-api/', MELLOMLAGRET_DATA_FILNAVN];
    return directories.join(path.sep);
};

export const updateSoknad = (soknadsdata: any) => {
    const fileName = getFilePathMellomlagretData();
    fs.writeFileSync(fileName, JSON.stringify(soknadsdata, null, 4));
};

export const deleteSoknad = () => {
    const fileName = getFilePathMellomlagretData();
    fs.openSync(fileName, 'w');
};

export const getSoknad = () => {
    const fileName = getFilePathMellomlagretData();
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch {
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
        } catch {
            return {};
        }
    }
};

export const getStønadskvoter = async (req: any) => {
    try {
        const data = await fetch('https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto', {
            method: 'POST',
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
            },
            credentials: 'omit',
            body: JSON.stringify(req.body),
        });

        const jsonResponse = await data.json();

        return jsonResponse;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
};

export const getSoknadSendt = () => {
    const fileName = getFilePath('soknad_sendt.json');
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch {
            return {};
        }
    }
};

export const getSaker = () => {
    const fileName = getFilePath('saker.json');
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch {
            return {};
        }
    }
};

export const getAnnenPartVedtak = () => {
    const fileName = getFilePath('annenPartVedtak.json');
    if (!fs.existsSync(fileName)) {
        return null;
    } else {
        try {
            const data = fs.readFileSync(fileName, 'utf8');
            return data && data !== '' ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }
};

dotenv.config();
const app = express();
const router = express.Router();

app.disable('x-powered-by');

const allowCrossDomain = (_req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location,Fnr');
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};
const delayAllResponses = (millis: number) => {
    return (_req: any, _res: any, next: any) => {
        setTimeout(next, millis);
    };
};

app.use(allowCrossDomain);
app.use(delayAllResponses(500));
app.use(express.json());

router.get(['/fpoversikt/api/personopplysninger/foreldrepenger'], (_req, res) => {
    res.send(getSokerInfo());
});

router.get('/fpsoknad/api/storage/FORELDREPENGER', (_req, res) => {
    res.send(getSoknad());
});

router.post('/fpsoknad/api/storage/FORELDREPENGER', (req, res) => {
    updateSoknad(req.body);
    return res.sendStatus(200);
});

router.delete('/fpsoknad/api/storage/FORELDREPENGER', (_req, res) => {
    deleteSoknad();
    return res.sendStatus(200);
});

router.get('/fpoversikt/api/saker', (_req, res) => {
    res.send(getSaker());
});

router.post('/fpoversikt/api/annenPart', (_req, res) => {
    res.send(getAnnenPartVedtak());
});

router.post('/fpgrunndata/api/konto', async (req, res) => {
    const response = await getStønadskvoter(req);
    res.send(response);
});

router.post('/fpsoknad/api/soknad/foreldrepenger', (_req, res) => {
    return res.send(getSoknadSendt());
});

router.post('/fpsoknad/api/soknad/foreldrepenger/endre', (_req, res) => {
    return res.send(getSoknadSendt());
});

router.delete('/fpsoknad/api/storage/FORELDREPENGER/vedlegg/:uuid', (_req, res) => {
    return res.sendStatus(204);
});

router.post('/fpsoknad/api/storage/FORELDREPENGER/vedlegg', (_req, res) => {
    res.setHeader('Location', 'http://localhost:8888/vedlegg/123');
    res.sendStatus(201);
});

router.get('/fpoversikt/api/saker/erOppdatert', (_req, res) => {
    res.send(true);
});

router.get('/fpsoknad/api/soknad/status', (_req, res) => {
    res.send([]);
});

router.post('/fpoversikt/api/arbeid/morDokumentasjon', (_req, res) => {
    res.send(false);
});

router.get('/fpoversikt/api/arbeid/mineFrilansoppdrag', (_req, res) => {
    res.send([
        {
            arbeidsgiverId: '999999999',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Frilansoppdrag AS',
            stillingsprosent: 100,
            fom: '2025-01-01',
        },
    ]);
});

app.use('', router);

const port = process.env.PORT || 8888;

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Mock-api listening on port: ${port}`);
});
