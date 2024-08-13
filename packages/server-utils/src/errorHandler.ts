import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';

// TODO: Legg til mer avansert feilhåndtering
export function errorHandling(
    error: Error,
    _request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) {
    if (axios.isAxiosError(error)) {
        // eslint-disable-next-line no-console
        console.error(error.response?.data);
    }
    return response.status(500).json({
        error: 'Internal server error',
    });
}
