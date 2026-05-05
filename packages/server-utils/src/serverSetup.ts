import express, { Express } from 'express';
import helmet from 'helmet';

export const setupServerDefaults = (server: Express) => {
    server.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: false,
                directives: {
                    'default-src': ["'self'"],
                    'base-uri': ["'self'"],
                    'script-src': ["'self'", "'unsafe-inline'", '*.nav.no'],
                    'style-src': ["'self'", "'unsafe-inline'", '*.nav.no'],
                    'connect-src': ["'self'", '*.nav.no', 'https://sentry.gc.nav.no'],
                    'font-src': ["'self'", 'https://cdn.nav.no', 'data:'],
                    'img-src': ["'self'", 'data:', '*.nav.no'],
                    'frame-src': ["'self'"],
                    'child-src': ["'self'"],
                    'media-src': ["'none'"],
                    'object-src': ["'none'"],
                },
            },
            referrerPolicy: { policy: 'no-referrer' },
            hidePoweredBy: true,
            noSniff: true,
        }),
    );

    // Restricts the server to only accept UTF-8 encoding of bodies
    server.use(express.urlencoded({ extended: true }));

    server.set('trust proxy', 1);
};
