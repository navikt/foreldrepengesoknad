import { HTTPError } from 'ky';

import type { ProblemDetails } from '@navikt/fp-types';

/**
 * Backend svarer 403 med feilkode IKKE_TILGANG_UMYNDIG når innlogget bruker er
 * under 18 år. Dette skal gi ei forklarande Umyndig-side i staden for ei
 * generisk teknisk feilmelding.
 */
export const erIkkeTilgangUmyndigFeil = (error: unknown): boolean => {
    if (!(error instanceof HTTPError) || error.response.status !== 403) {
        return false;
    }

    const problemDetails = error.data as ProblemDetails | undefined;
    return problemDetails?.feilkode === 'IKKE_TILGANG_UMYNDIG';
};
