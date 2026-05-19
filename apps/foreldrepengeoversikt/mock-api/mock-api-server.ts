import express from 'express';
import morgan from 'morgan';
import fs from 'node:fs';
import path from 'node:path';

const getFilePath = (filnavn: string) => {
    const directories = ['./mock-api/', 'mock_data', filnavn];
    return directories.join(path.sep);
};

const getFileContent = (filnavn: string) => {
    const fileName = getFilePath(filnavn);
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

export const getSokerinfo = () => {
    return getFileContent('sokerinfo.json');
};

export const getDokumenter = () => {
    return getFileContent('dokumenter.json');
};

export const getAnnenPartsVedtak = () => {
    return getFileContent('annenPartVedtak.json');
};

export const getSaker = () => {
    return getFileContent('saker.json');
};

export const getMinidialog = () => {
    return getFileContent('miniDialog.json');
};

export const getManglendeVedlegg = () => {
    return getFileContent('manglendeVedlegg.json');
};

export const getTidslinjeHendelser = () => {
    return getFileContent('tidslinjeHendelser.json');
};

export const getKonto = () => {
    const fileName = getFilePath('konto.json');
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

const app = express();
const router = express.Router();

app.disable('x-powered-by');

const allowCrossDomain = (req: any, res: any, next: any) => {
    // 8080 dev server with decorator, 8880 dev server without decorator
    const corsWhiteList = ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:8880'];

    if (corsWhiteList.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location');
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
app.use(morgan('tiny'));

router.get(['/fpoversikt/api/personopplysninger/oversikt'], (_req, res) => {
    res.send(getSokerinfo());
});

router.get(['/fpoversikt/api/dokument/alle'], (_req, res) => {
    res.send(getDokumenter());
});

router.post(['/fpoversikt/api/annenPart'], (_req, res) => {
    res.send(getAnnenPartsVedtak());
});

router.get('/fpoversikt/api/saker', (_req, res) => {
    res.send(getSaker());
});

router.get('/fpoversikt/api/saker/erOppdatert', (_req, res) => {
    res.send(true);
});

router.get('/fpoversikt/api/oppgaver/tilbakekrevingsuttalelse', (_req, res) => {
    res.send(getMinidialog());
});

router.get('/fpoversikt/api/oppgaver/manglendevedlegg', (_req, res) => {
    res.send(getManglendeVedlegg());
});

router.post('/fpgrunndata/api/konto', (_req, res) => {
    res.send(getKonto());
});

router.get('/fpoversikt/api/tidslinje', (_req, res) => {
    res.send(getTidslinjeHendelser());
});

router.get('/fpoversikt/api/inntektsmeldinger', (_req, res) => {
    res.send([]);
});

router.delete('/fpsoknad/api/storage/FORELDREPENGER/vedlegg/:id', (_req, res) => {
    res.sendStatus(204);
});
router.delete('/fpsoknad/api/storage/SVANGERSKAPSPENGER/vedlegg/:id', (_req, res) => {
    res.sendStatus(204);
});
router.delete('/fpsoknad/api/storage/ENGANGSSTONAD/vedlegg/:id', (_req, res) => {
    res.sendStatus(204);
});

router.post('/fpsoknad/api/soknad/ettersend', (_req, res) => {
    const kvittering = {
        saksNr: '123',
        jornalId: '123',
        leveranseStatus: 'SENDT_OG_FORSØKT_BEHANDLET_FPSAK',
        mottattDato: '2019-01-01',
        referanseId: '123',
    };
    res.send(kvittering);
});

app.use('', router);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Mock-api listening on port: ${port}`);
});
