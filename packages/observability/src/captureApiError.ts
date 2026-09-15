import { captureException } from '@nais/apm';

import type { ProblemDetails } from '@navikt/fp-types';

export const captureApiError = (message: string, apiError?: ProblemDetails) => {
    captureException(new Error(message), {
        context: {
            ...(apiError?.feilkode && { feilkode: apiError.feilkode }),
            ...(apiError?.callId && { callId: apiError.callId }),
        },
    });
};
