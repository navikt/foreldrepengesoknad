import { captureMessage, withScope } from '@sentry/browser';

import type { ProblemDetailsBase } from '@navikt/fp-types';

type ApiError = Partial<ProblemDetailsBase & { feilkode: string }>;

export const captureApiError = (message: string, apiError?: ApiError) => {
    withScope((scope) => {
        if (apiError?.callId) {
            scope.setTag('callId', apiError.callId);
        }
        if (apiError?.feilkode) {
            scope.setTag('feilkode', apiError.feilkode);
        }
        if (apiError) {
            scope.setContext('apiError', apiError);
        }
        captureMessage(message);
    });
};
