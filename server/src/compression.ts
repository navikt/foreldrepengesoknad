import { NextFunction, Request, Response } from 'express';

const FILENDELSER_VI_KOMPRIMERER = ['.js', '.html', '.css'];

export const serveKomprimerteFilerHvisMulig = (request: Request, response: Response, next: NextFunction) => {
    const komprimering = utledKomprimeringsAlgoritme(request);
    if (komprimering === undefined) {
        return next();
    }
    if (FILENDELSER_VI_KOMPRIMERER.some((filendelse) => request.path.endsWith(filendelse))) {
        request.url = `${request.url}.${komprimering}`;
        response.set('Content-Encoding', komprimering);
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
