import express, { Express } from 'express';

export const setupServerDefaults = async (server: Express) => {
    server.disable('x-powered-by');
    server.use((_req, res, next) => {
        res.removeHeader('X-Powered-By');
        res.set('X-Frame-Options', 'SAMEORIGIN');
        res.set('X-XSS-Protection', '1; mode=block');
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('Referrer-Policy', 'no-referrer');
        res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
        next();
    });

    // Restricts the server to only accept UTF-8 encoding of bodies
    server.use(express.urlencoded({ extended: true }));

    server.set('trust proxy', 1);
};
