import type { ProblemDetails } from '@navikt/fp-types';

export class ApiError extends Error {
    readonly sentryMessage: string;
    readonly problemDetails?: ProblemDetails;

    constructor(userMessage: string, sentryMessage: string, problemDetails?: ProblemDetails) {
        super(userMessage);
        this.name = 'ApiError';
        this.sentryMessage = sentryMessage;
        this.problemDetails = problemDetails;
    }
}
