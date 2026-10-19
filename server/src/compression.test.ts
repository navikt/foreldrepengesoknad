import express from 'express';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import supertest from 'supertest';
import { afterAll, describe, expect, it } from 'vitest';

import { lagKomprimeringsMiddleware } from './compression';

const UKOMPRIMERT_JS = 'console.log("ukomprimert");';
const BROTLI_JS = 'brotli-innhold';
const GZIP_JS = 'gzip-innhold';

const lagRotKatalog = (testKatalog: string) => {
    const rotKatalog = path.join(testKatalog, 'public');
    fs.mkdirSync(path.join(rotKatalog, 'assets'), { recursive: true });
    fs.writeFileSync(path.join(rotKatalog, 'assets', 'app.js'), UKOMPRIMERT_JS);
    fs.writeFileSync(path.join(rotKatalog, 'assets', 'app.js.br'), zlib.brotliCompressSync(BROTLI_JS));
    fs.writeFileSync(path.join(rotKatalog, 'assets', 'app.js.gz'), zlib.gzipSync(GZIP_JS));
    fs.writeFileSync(path.join(rotKatalog, 'assets', 'liten.js'), UKOMPRIMERT_JS);
    fs.writeFileSync(path.join(rotKatalog, 'assets', 'bare-gzip.js'), UKOMPRIMERT_JS);
    fs.writeFileSync(path.join(rotKatalog, 'assets', 'bare-gzip.js.gz'), zlib.gzipSync(GZIP_JS));
    fs.writeFileSync(path.join(testKatalog, 'utenfor.js.br'), zlib.brotliCompressSync(BROTLI_JS));
    return rotKatalog;
};

const lagApp = (rotKatalog: string) => {
    const app = express();
    app.use(lagKomprimeringsMiddleware(rotKatalog));
    app.use(express.static(rotKatalog, { index: false }));
    app.use((_req, res) => {
        res.status(200).type('html').send('<html>fallback</html>');
    });
    return app;
};

const testKatalog = fs.mkdtempSync(path.join(os.tmpdir(), 'compression-test-'));
const rotKatalog = lagRotKatalog(testKatalog);
const app = lagApp(rotKatalog);

afterAll(() => {
    fs.rmSync(testKatalog, { recursive: true, force: true });
});

const hentTekst = (url: string, acceptEncoding: string) =>
    supertest(app)
        .get(url)
        .set('Accept-Encoding', acceptEncoding)
        .buffer(true)
        .parse((res, callback) => {
            let data = '';
            res.on('data', (chunk: Buffer) => {
                data += chunk.toString();
            });
            res.on('end', () => callback(null, data));
        });

describe('lagKomprimeringsMiddleware', () => {
    it('serverer .br-fila når klienten støttar brotli og fila finst', async () => {
        const response = await hentTekst('/assets/app.js', 'gzip, deflate, br');

        expect(response.status).toBe(200);
        expect(response.headers['content-encoding']).toBe('br');
        expect(response.headers['content-type']).toContain('application/javascript');
        expect(response.headers['vary']).toContain('Accept-Encoding');
        expect(response.body).toBe(BROTLI_JS);
    });

    it('fell tilbake til gzip når berre .gz finst', async () => {
        const response = await hentTekst('/assets/bare-gzip.js', 'gzip, br');

        expect(response.headers['content-encoding']).toBe('gzip');
        expect(response.body).toBe(GZIP_JS);
    });

    it('serverer ukomprimert fil utan Content-Encoding når komprimert variant manglar', async () => {
        const response = await hentTekst('/assets/liten.js', 'gzip, br');

        expect(response.status).toBe(200);
        expect(response.headers['content-encoding']).toBeUndefined();
        expect(response.body).toBe(UKOMPRIMERT_JS);
    });

    it('set ikkje Content-Encoding på fallback når fila ikkje finst', async () => {
        const response = await hentTekst('/assets/finst-ikkje.js', 'br');

        expect(response.headers['content-encoding']).toBeUndefined();
        expect(response.body).toBe('<html>fallback</html>');
    });

    it('legg suffikset før query-stringen', async () => {
        const response = await hentTekst('/assets/app.js?v=1', 'br');

        expect(response.status).toBe(200);
        expect(response.headers['content-encoding']).toBe('br');
        expect(response.body).toBe(BROTLI_JS);
    });

    it('serverer ikkje komprimerte filer utanfor rot-katalogen', async () => {
        const response = await hentTekst('/assets/..%2F..%2Futenfor.js', 'br');

        expect(response.headers['content-encoding']).toBeUndefined();
        expect(response.body).not.toBe(BROTLI_JS);
    });

    it('rører ikkje requesten når klienten ikkje støttar komprimering', async () => {
        const response = await hentTekst('/assets/app.js', 'identity');

        expect(response.headers['content-encoding']).toBeUndefined();
        expect(response.body).toBe(UKOMPRIMERT_JS);
    });
});
