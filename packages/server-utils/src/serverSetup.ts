import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import express, { Express } from 'express';

import config from './config.js';

const appDirectives = {
    'default-src': ["'self'"], // Restricts all resource loading to same-origin by default
    'connect-src': ["'self'", 'https://sentry.gc.nav.no'], // Sentry error reporting sends events to a non-nav.no domain
    'object-src': ["'none'"], // Blocks legacy plugin content (Flash/Java) regardless of default-src
};

export const setupServerDefaults = async (server: Express) => {
    const cspHeader = await buildCspHeader(appDirectives, { env: config.app.env });

    server.use((_req, res, next) => {
        res.setHeader('Content-Security-Policy', cspHeader);
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Referrer-Policy', 'no-referrer');
        res.removeHeader('X-Powered-By');
        next();
    });

    // Restricts the server to only accept UTF-8 encoding of bodies
    server.use(express.urlencoded({ extended: true }));

    server.set('trust proxy', 1);
};
