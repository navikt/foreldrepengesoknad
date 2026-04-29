import { captureMessage, withScope } from '@sentry/browser';

import type { ProblemDetails } from '@navikt/fp-types';

export const captureApiError = (message: string, apiError?: ProblemDetails) => {
    withScope((scope) => {
        if (apiError) {
            scope.setContext('apiError', {
                feilkode: apiError.feilkode,
                callId: apiError.callId,
            });
        }
        captureMessage(message);
    });
};
