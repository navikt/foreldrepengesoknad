import { getToken, validateIdportenToken } from '@navikt/oasis';
import { NextFunction, Request, Response } from 'express';

import { logger } from '@navikt/fp-server-utils';

export const validerInnkommendeIdportenToken = async (request: Request, response: Response, next: NextFunction) => {
    const token = getToken(request);
    if (!token) {
        logger.warning('No token present');
        return response.status(401).send();
    }

    const validation = await validateIdportenToken(token);
    if (!validation.ok) {
        console.log('Invalid token validation', validation);
        return response.status(403).send();
    }

    return next();
};
