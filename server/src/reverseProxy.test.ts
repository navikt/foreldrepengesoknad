import http from 'node:http';

import express, { Router } from 'express';
import supertest from 'supertest';
import { afterAll, beforeAll, expect, test, vi } from 'vitest';

vi.mock('@navikt/oasis', () => ({
    getToken: () => 'mock-idporten-token',
    requestTokenxOboToken: async () => ({ ok: true, token: 'mock-obo-token' }),
}));

vi.mock('@navikt/fp-server-utils', () => ({
    logger: {
        info: () => {},
        warning: () => {},
        error: () => {},
    },
    serverConfig: {
        påkrevMiljøVariabel: (name: string) => `mock-${name}`,
    },
}));

let app: express.Express;
let backendServer: http.Server;
let backendPort: number;
let lastRequest: { path: string; headers: http.IncomingHttpHeaders };

beforeAll(async () => {
    backendServer = http.createServer((req, res) => {
        lastRequest = { path: req.url ?? '', headers: req.headers };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
    });
    await new Promise<void>((resolve) => {
        backendServer.listen(0, () => {
            backendPort = (backendServer.address() as { port: number }).port;
            resolve();
        });
    });

    vi.doMock('@navikt/fp-server-utils', () => ({
        logger: {
            info: () => {},
            warning: () => {},
            error: () => {},
        },
        serverConfig: {
            påkrevMiljøVariabel: (name: string) => {
                if (name === 'FPSOKNAD_API_URL') return `http://localhost:${backendPort}/fpsoknad/api`;
                if (name === 'FPSOKNAD_API_SCOPE') return 'api://test-fpsoknad/.default';
                if (name === 'FPOVERSIKT_API_URL') return `http://localhost:${backendPort}/fpoversikt/api`;
                if (name === 'FPOVERSIKT_API_SCOPE') return 'api://test-fpoversikt/.default';
                if (name === 'FPGRUNNDATA_API_URL') return `http://localhost:${backendPort}/fpgrunndata/api`;
                return `mock-${name}`;
            },
        },
    }));

    const { configureReverseProxyApi } = await import('./reverseProxy.js');
    app = express();
    const router = Router();
    configureReverseProxyApi(router);
    app.use(router);
});

afterAll(() => backendServer?.close());

test('forwards fpsoknad request with full path', async () => {
    await supertest(app).get('/fpsoknad/api/storage/FORELDREPENGER').set('Authorization', 'Bearer t').expect(200);
    expect(lastRequest.path).toBe('/fpsoknad/api/storage/FORELDREPENGER');
});

test('forwards fpoversikt request with full path', async () => {
    await supertest(app).get('/fpoversikt/api/saker').set('Authorization', 'Bearer t').expect(200);
    expect(lastRequest.path).toBe('/fpoversikt/api/saker');
});

test('forwards fpgrunndata request (no auth)', async () => {
    await supertest(app).get('/fpgrunndata/api/konto').expect(200);
    expect(lastRequest.path).toBe('/fpgrunndata/api/konto');
});

test('forwards query string', async () => {
    await supertest(app).get('/fpoversikt/api/saker?page=1').set('Authorization', 'Bearer t').expect(200);
    expect(lastRequest.path).toBe('/fpoversikt/api/saker?page=1');
});

test('sets OBO token as Authorization header', async () => {
    await supertest(app).get('/fpsoknad/api/storage/FORELDREPENGER').set('Authorization', 'Bearer t').expect(200);
    expect(lastRequest.headers.authorization).toBe('Bearer mock-obo-token');
});

test('strips cookie header', async () => {
    await supertest(app)
        .get('/fpsoknad/api/storage/FORELDREPENGER')
        .set('Authorization', 'Bearer t')
        .set('Cookie', 'session=abc')
        .expect(200);
    expect(lastRequest.headers.cookie).toBeUndefined();
});

test('does not proxy requests outside configured paths', async () => {
    const res = await supertest(app).get('/internal/health').set('Authorization', 'Bearer t');
    expect(res.status).toBe(404);
});
