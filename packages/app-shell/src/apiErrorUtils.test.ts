import { HTTPError } from 'ky';

import type { FpOversiktProblemDetails } from '@navikt/fp-types';

import { erUmyndigFeil } from './apiErrorUtils';

const lagHttpError = (status: number, data?: FpOversiktProblemDetails): HTTPError => {
    const response = new Response(null, { status });
    const request = new Request('https://example.com');
    const error = new HTTPError(response, request, {} as never);
    error.data = data;
    return error;
};

describe('erUmyndigFeil', () => {
    it('skal returnere true når feilen er 403 med feilkode IKKE_TILGANG_UMYNDIG', () => {
        const error = lagHttpError(403, {
            feilkode: 'IKKE_TILGANG_UMYNDIG',
            feilmelding: 'Innlogget bruker er under myndighetsalder',
        });

        expect(erUmyndigFeil(error)).toBe(true);
    });

    it('skal returnere false når feilen er 403 med ein annan feilkode', () => {
        const error = lagHttpError(403, { feilkode: 'IKKE_TILGANG', feilmelding: 'Ingen tilgang' });

        expect(erUmyndigFeil(error)).toBe(false);
    });

    it('skal returnere false når statuskoden ikkje er 403', () => {
        const error = lagHttpError(500, {
            feilkode: 'IKKE_TILGANG_UMYNDIG',
            feilmelding: 'Innlogget bruker er under myndighetsalder',
        });

        expect(erUmyndigFeil(error)).toBe(false);
    });

    it('skal returnere false for feil som ikkje er ein HTTPError', () => {
        expect(erUmyndigFeil(new Error('noko anna gjekk gale'))).toBe(false);
        expect(erUmyndigFeil(undefined)).toBe(false);
        expect(erUmyndigFeil(null)).toBe(false);
    });
});
