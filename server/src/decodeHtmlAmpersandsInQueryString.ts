import { NextFunction, Request, Response } from 'express';

import { logger } from '@navikt/fp-server-utils';

export const decodeHtmlAmpersandsInQueryString = (req: Request, _res: Response, next: NextFunction) => {
    if (req.url.includes('?') && req.url.includes('&amp;')) {
        logger.info(`Bytter ut HTML-encoded ampersand med literal ampersand i query-streng: ${req.url}`);
        req.url = req.url.replaceAll('&amp;', '&');
    }
    next();
};
