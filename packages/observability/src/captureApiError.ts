import { captureMessage, withScope } from '@sentry/browser';

type ApiErrorContext = {
    callId?: string;
    feilkode?: string;
    feilmelding?: string;
};

export const captureApiError = (message: string, apiError?: ApiErrorContext) => {
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
