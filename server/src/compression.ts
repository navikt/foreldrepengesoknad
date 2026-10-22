import { NextFunction, Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Primært relevant for js og css filer.
 * Har lagt til html støtte men vil ikke påvirke den første requesten som server selve appen (index.html) siden den ikke
 * spesifikt spør etter .html fila, men den serves som en fallback
 */
const MIME_TYPES: Record<string, string> = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
};

const FILENDELSER_VI_KOMPRIMERER = Object.keys(MIME_TYPES);

const finnKomprimerteFiler = (rotKatalog: string): Set<string> => {
    if (!fs.existsSync(rotKatalog)) {
        return new Set();
    }
    const filer = fs.readdirSync(rotKatalog, { recursive: true, encoding: 'utf8' });
    return new Set(
        filer.filter((fil) => fil.endsWith('.br') || fil.endsWith('.gz')).map((fil) => fil.split(path.sep).join('/')),
    );
};

const tilRelativSti = (sti: string): string | undefined => {
    let dekodet: string;
    try {
        dekodet = decodeURIComponent(sti);
    } catch {
        return undefined;
    }
    if (dekodet.includes('\0') || !dekodet.startsWith('/') || path.posix.normalize(dekodet) !== dekodet) {
        return undefined;
    }
    return dekodet.slice(1);
};

export const lagKomprimeringsMiddleware = (rotKatalog: string) => {
    const komprimerteFiler = finnKomprimerteFiler(rotKatalog);

    return (request: Request, response: Response, next: NextFunction) => {
        const komprimering = utledKomprimeringsAlgoritme(request);
        if (komprimering === undefined) {
            return next();
        }

        const [sti = '', ...query] = request.url.split('?');
        const filendelse = FILENDELSER_VI_KOMPRIMERER.find((extension) => sti.endsWith(extension));
        const relativSti = tilRelativSti(sti);
        if (filendelse && relativSti !== undefined && komprimerteFiler.has(`${relativSti}.${komprimering.extension}`)) {
            request.url = [`${sti}.${komprimering.extension}`, ...query].join('?');
            response.set('Content-Encoding', komprimering.encoding);
            response.set('Content-Type', MIME_TYPES[filendelse]);
            // Det er viktig å sette denne. Hvis ikke vil "br" og "gzip" requests kunne få samme E-tag og vi kan få caching issues med at feil type serves.
            response.vary('Accept-Encoding');
        }

        return next();
    };
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
