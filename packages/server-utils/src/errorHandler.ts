import type { NextFunction, Request, Response } from 'express';

import logger from './logger';

export function errorHandling(
    error: Error,
    _request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) {
    logger.error('Serverfeil', error);
    response.status(500).json({
        error: 'Internal server error',
    });
}
