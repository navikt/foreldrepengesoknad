import type { ProblemDetails } from '@navikt/fp-types';

export class ApiError extends Error {
    readonly telemetryMessage: string;
    readonly problemDetails?: ProblemDetails;

    constructor(userMessage: string, telemetryMessage: string, problemDetails?: ProblemDetails) {
        super(userMessage);
        this.name = 'ApiError';
        this.telemetryMessage = telemetryMessage;
        this.problemDetails = problemDetails;
    }
}
