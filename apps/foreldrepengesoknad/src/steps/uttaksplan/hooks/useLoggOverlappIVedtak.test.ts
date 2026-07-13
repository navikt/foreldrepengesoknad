import { renderHook } from '@testing-library/react';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { finnUgyldigeOverlappIUttaksplan, useLoggOverlappIVedtak } from './useLoggOverlappIVedtak';

const captureMessage = vi.hoisted(() => vi.fn());

vi.mock('@navikt/fp-observability', () => ({
    captureMessage: (...args: unknown[]) => captureMessage(...args),
    withScope: (callback: (scope: unknown) => void) =>
        callback({ setLevel: vi.fn(), setTag: vi.fn(), setExtra: vi.fn() }),
}));

const innvilget: UttakPeriode_fpoversikt['resultat'] = {
    innvilget: true,
    trekkerDager: true,
    trekkerMinsterett: false,
    årsak: 'ANNET',
};
const avslåttUtenTrekkdager: UttakPeriode_fpoversikt['resultat'] = {
    innvilget: false,
    trekkerDager: false,
    trekkerMinsterett: false,
    årsak: 'ANNET',
};

const periode = (overrides: Partial<UttakPeriode_fpoversikt>): UttakPeriode_fpoversikt => ({
    fom: '2026-01-01',
    tom: '2026-01-31',
    forelder: 'MOR',
    kontoType: 'FELLESPERIODE',
    flerbarnsdager: false,
    ...overrides,
});

describe('finnUgyldigeOverlappIUttaksplan', () => {
    it('finn ikkje ugyldig overlapp når ein avslått periode utan trekkdagar overlappar annen part sin reelle periode', () => {
        const morAvslått = periode({
            fom: '2026-07-27',
            tom: '2026-07-31',
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            resultat: avslåttUtenTrekkdager,
        });
        const farReell = periode({
            fom: '2026-07-06',
            tom: '2026-07-31',
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            resultat: innvilget,
        });

        const { ugyldigeOverlapp } = finnUgyldigeOverlappIUttaksplan([morAvslått, farReell]);

        expect(ugyldigeOverlapp).toHaveLength(0);
    });

    it('finn ugyldig overlapp når to reelle periodar overlappar utan samtidig uttak', () => {
        const mor = periode({
            fom: '2026-07-27',
            tom: '2026-07-31',
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            resultat: innvilget,
        });
        const far = periode({
            fom: '2026-07-06',
            tom: '2026-07-31',
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            resultat: innvilget,
        });

        const { ugyldigeOverlapp } = finnUgyldigeOverlappIUttaksplan([mor, far]);

        expect(ugyldigeOverlapp).toHaveLength(1);
    });

    it('finn ikkje ugyldig overlapp når overlappande periodar har samtidig uttak på begge partar', () => {
        const mor = periode({
            fom: '2025-10-14',
            tom: '2025-10-27',
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            samtidigUttak: 100,
            resultat: innvilget,
        });
        const far = periode({
            fom: '2025-10-14',
            tom: '2025-10-27',
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            samtidigUttak: 100,
            resultat: innvilget,
        });

        const { ugyldigeOverlapp } = finnUgyldigeOverlappIUttaksplan([mor, far]);

        expect(ugyldigeOverlapp).toHaveLength(0);
    });

    it('finn ikkje ugyldig overlapp når søkjaren sin eigen avslåtte periode overlappar annen part', () => {
        const farAvslått = periode({
            fom: '2025-11-10',
            tom: '2025-12-29',
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            resultat: avslåttUtenTrekkdager,
        });
        const morMødrekvote = periode({
            fom: '2025-11-10',
            tom: '2025-11-24',
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            resultat: innvilget,
        });
        const morFellesperiode = periode({
            fom: '2025-11-25',
            tom: '2026-03-06',
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            resultat: innvilget,
        });

        const { ugyldigeOverlapp } = finnUgyldigeOverlappIUttaksplan([farAvslått, morMødrekvote, morFellesperiode]);

        expect(ugyldigeOverlapp).toHaveLength(0);
    });
});

// vi.mock av barrel-pakka @navikt/fp-observability gjeld ikkje i Vitest browser-mode
// (pre-bundla). Denne bolken dekker sideeffekten (logging via captureMessage) og køyrer
// difor berre i jsdom; sjølve overlapp-logikken er dekka av testane over som køyrer i begge modus.
describe.skipIf(import.meta.env['TEST_MODE'] === 'browser-mode')('useLoggOverlappIVedtak (logging)', () => {
    beforeEach(() => {
        captureMessage.mockClear();
    });

    it('loggar ikkje når ein avslått periode utan trekkdagar overlappar annen part sin reelle periode', () => {
        const morAvslått = periode({
            fom: '2026-07-27',
            tom: '2026-07-31',
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            resultat: avslåttUtenTrekkdager,
        });
        const farReell = periode({
            fom: '2026-07-06',
            tom: '2026-07-31',
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            resultat: innvilget,
        });

        renderHook(() => useLoggOverlappIVedtak([morAvslått, farReell], [morAvslått], [farReell]));

        expect(captureMessage).not.toHaveBeenCalled();
    });

    it('loggar når to reelle periodar overlappar utan samtidig uttak', () => {
        const mor = periode({
            fom: '2026-07-27',
            tom: '2026-07-31',
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            resultat: innvilget,
        });
        const far = periode({
            fom: '2026-07-06',
            tom: '2026-07-31',
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            resultat: innvilget,
        });

        renderHook(() => useLoggOverlappIVedtak([mor, far], [mor], [far]));

        expect(captureMessage).toHaveBeenCalledWith(
            'Uttaksplan har ugyldig overlappande periodar etter transformasjon',
            'warning',
        );
    });
});
