import { NextFunction, Request, Response } from 'express';

/**
 * Primært relevant for js og css filer.
 * Har lagt til html støtte men vil ikke påvirke den første requesten som server selve appen (index.html) siden den ikke spesifikt spør etter .html fila, men den serves som en fallback
 */
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
        // Det er viktig å sette denne. Hvis ikke vil "br" og "gzip" requests kunne få samme E-tag og vi kan få caching issues med at feil type serves.
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
