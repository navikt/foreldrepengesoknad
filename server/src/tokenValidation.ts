import { getToken, validateIdportenToken } from '@navikt/oasis';
import { NextFunction, Request, Response } from 'express';

import { logger } from '@navikt/fp-server-utils';

export const validerInnkommendeIdportenToken = async (request: Request, response: Response, next: NextFunction) => {
    const token = getToken(request);
    if (!token) {
        response.status(401).send();
        return;
    }

    const validation = await validateIdportenToken(token);
    if (!validation.ok) {
        logger.error('Ugyldig IDporten token', validation);
        response.status(403).send();
        return;
    }

    return next();
};
