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
                    'script-src': [
                        "'self'",
                        "'unsafe-inline'",
                        "'unsafe-eval'",
                        '*.nav.no',
                        'https://survey.skyra.no',
                        'https://in2.taskanalytics.com',
                    ],
                    'style-src': ["'self'", "'unsafe-inline'", '*.nav.no'],
                    'connect-src': [
                        "'self'",
                        '*.nav.no',
                        'https://sentry.gc.nav.no',
                        'https://*.skyra.no',
                        'https://in2.taskanalytics.com',
                    ],
                    'font-src': ["'self'", 'https://cdn.nav.no', 'data:'],
                    'img-src': ["'self'", 'data:', '*.nav.no'],
                    'frame-src': ["'self'"],
                    'child-src': ["'self'"],
                    'manifest-src': ["'self'", 'https://cdn.nav.no'],
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
