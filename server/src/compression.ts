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
        request.url = `${request.url}.${komprimering.extension}`;
        response.set('Content-Encoding', komprimering.encoding);
        response.set('Content-Type', MIME_TYPES[filendelse]);
        response.set('Vary', 'Accept-Encoding');
    }

    return next();
};

type Komprimering = { extension: string; encoding: string };

const utledKomprimeringsAlgoritme = (request: Request): Komprimering | undefined => {
    const acceptEncoding = request.headers['accept-encoding'];
    const encodings = Array.isArray(acceptEncoding) ? acceptEncoding.join(',') : acceptEncoding;

    if (encodings?.includes('br')) {
        return { extension: 'br', encoding: 'br' };
    }
    if (encodings?.includes('gzip')) {
        return { extension: 'gz', encoding: 'gzip' };
    }

    return undefined;
};
