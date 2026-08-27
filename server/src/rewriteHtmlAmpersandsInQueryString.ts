import { NextFunction, Request, Response } from 'express';

import { logger } from '@navikt/fp-server-utils';

export const rewriteHtmlAmpersandsInQueryString = (request: Request, _response: Response, next: NextFunction) => {
    if (request.url.includes('?') && request.url.includes('&amp;')) {
        logger.info(`Bytter ut HTML-encoded ampersand med literal ampersand i query string`);
        request.url = request.url.replaceAll('&amp;', '&');
    }
    next();
};
