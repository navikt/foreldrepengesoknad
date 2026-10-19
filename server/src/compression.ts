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

type Komprimering = { extension: string; encoding: string };

const BROTLI: Komprimering = { extension: 'br', encoding: 'br' };
const GZIP: Komprimering = { extension: 'gz', encoding: 'gzip' };

const finnKomprimerteFiler = (rotKatalog: string): Set<string> => {
    if (!fs.existsSync(rotKatalog)) {
        return new Set();
    }
    const filer = fs.readdirSync(rotKatalog, { recursive: true, encoding: 'utf8' });
    return new Set(
        filer
            .filter((fil) => fil.endsWith(`.${BROTLI.extension}`) || fil.endsWith(`.${GZIP.extension}`))
            .map((fil) => fil.split(path.sep).join('/')),
    );
};

const tilRelativSti = (pathname: string): string | undefined => {
    let dekodet: string;
    try {
        dekodet = decodeURIComponent(pathname);
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
        const [pathname = '', ...query] = request.url.split('?');
        const filendelse = FILENDELSER_VI_KOMPRIMERER.find((extension) => pathname.endsWith(extension));
        if (!filendelse) {
            return next();
        }

        const relativSti = tilRelativSti(pathname);
        if (relativSti === undefined) {
            return next();
        }

        const tilgjengelige = [BROTLI, GZIP].filter((k) => komprimerteFiler.has(`${relativSti}.${k.extension}`));
        if (tilgjengelige.length === 0) {
            return next();
        }

        // Det er viktig å sette denne. Hvis ikke vil "br" og "gzip" requests kunne få samme E-tag og vi kan få caching issues med at feil type serves.
        response.vary('Accept-Encoding');

        const komprimering = utledKomprimeringsAlgoritme(request, tilgjengelige);
        if (komprimering === undefined) {
            return next();
        }

        const queryString = query.length > 0 ? `?${query.join('?')}` : '';
        request.url = `${pathname}.${komprimering.extension}${queryString}`;
        response.set('Content-Encoding', komprimering.encoding);
        response.set('Content-Type', MIME_TYPES[filendelse]);

        return next();
    };
};

const utledKomprimeringsAlgoritme = (request: Request, tilgjengelige: Komprimering[]): Komprimering | undefined => {
    const acceptEncoding = request.headers['accept-encoding'];
    const encodings = Array.isArray(acceptEncoding) ? acceptEncoding.join(',') : acceptEncoding;

    return tilgjengelige.find((komprimering) => encodings?.includes(komprimering.encoding));
};
