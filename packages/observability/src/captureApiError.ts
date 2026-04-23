import { captureMessage, withScope } from '@sentry/browser';

import type { ProblemDetails } from '@navikt/fp-types';

export const captureApiError = (message: string, apiError?: ProblemDetails) => {
    withScope((scope) => {
        if (apiError?.callId) {
            scope.setTag('callId', apiError.callId);
        }
        if (apiError?.feilkode) {
            scope.setTag('feilkode', apiError.feilkode);
        }
        if (apiError) {
            scope.setContext('apiError', { ...apiError });
        }
        captureMessage(message);
    });
};
