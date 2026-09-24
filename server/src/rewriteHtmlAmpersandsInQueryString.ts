import { NextFunction, Request, Response } from 'express';
import { logger } from '@navikt/fp-server-utils';

export const rewriteHtmlAmpersandsInQueryString = (request: Request, _response: Response, next: NextFunction) => {
    const currentUrl = request.originalUrl ?? request.url;

    if (currentUrl.includes('?') && currentUrl.includes('&amp;')) {
        const normalizedUrl = currentUrl.replaceAll('&amp;', '&');

        logger.info('Bytter ut HTML-encoded ampersand med literal ampersand i query string');

        request.url = normalizedUrl;
        request.originalUrl = normalizedUrl;
    }

    next();
};
