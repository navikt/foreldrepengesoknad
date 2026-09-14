import express from 'express';
import supertest from 'supertest';
import { expect, test, vi } from 'vitest';

vi.mock('@navikt/fp-server-utils', () => ({
    logger: { info: vi.fn() },
}));

import { rewriteHtmlAmpersandsInQueryString } from './rewriteHtmlAmpersandsInQueryString.js';

test('omskriver html-encoded ampersands', async () => {
    const app = express();

    app.use((req, _res, next) => {
        req.originalUrl = '/foo?foo=1&amp;bar=2&amp;baz=3';
        req.url = '/foo?foo=1&amp;bar=2&amp;baz=3';
        next();
    });

    app.use(rewriteHtmlAmpersandsInQueryString);

    app.get('/foo', (req, res) => {
        res.json({
            url: req.url,
            originalUrl: req.originalUrl,
        });
    });

    const res = await supertest(app).get('/foo?foo=1&amp;bar=2&amp;baz=3');
    expect(res.body).toEqual({
        url: '/foo?foo=1&bar=2&baz=3',
        originalUrl: '/foo?foo=1&bar=2&baz=3',
    });
});
