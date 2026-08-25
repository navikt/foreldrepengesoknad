import { captureException } from '@nais/apm';

import { captureApiError } from './captureApiError';

vi.mock('@nais/apm', () => ({
    captureException: vi.fn(),
}));

describe('captureApiError', () => {
    it('rapporterer håndtert API-feil med feilkode og callId', () => {
        captureApiError('Kunne ikke hente saken', {
            feilmelding: 'Internal Server Error',
            feilkode: 'GENERELL',
            callId: 'call-456',
        });

        expect(captureException).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Kunne ikke hente saken',
            }),
            {
                context: {
                    feilkode: 'GENERELL',
                    callId: 'call-456',
                },
            },
        );
    });
});
