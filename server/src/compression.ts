import { NextFunction, Request, Response } from 'express';

const MIME_TYPES: Record<string, string> = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
};

const FILENDELSER_VI_KOMPRIMERER = Object.keys(MIME_TYPES);

export const serveKomprimerteFilerHvisMulig = (request: Request, response: Response, next: NextFunction) => {
    const komprimering = utledKomprimeringsAlgoritme(request);
    if (komprimering === undefined) {
        return next();
    }

    const filendelse = FILENDELSER_VI_KOMPRIMERER.find((ext) => request.path.endsWith(ext));
    if (filendelse) {
        request.url = `${request.url}.${komprimering}`;
        response.set('Content-Encoding', komprimering);
        response.set('Content-Type', MIME_TYPES[filendelse]);
    }

    return next();
};

const utledKomprimeringsAlgoritme = (request: Request): 'br' | 'gzip' | undefined => {
    const acceptEncoding = request.headers['accept-encoding'];
    const encodings = Array.isArray(acceptEncoding) ? acceptEncoding.join(',') : acceptEncoding;

    if (encodings?.includes('br')) {
        return 'br';
    }
    if (encodings?.includes('gzip')) {
        return 'gzip';
    }

    return undefined;
};
