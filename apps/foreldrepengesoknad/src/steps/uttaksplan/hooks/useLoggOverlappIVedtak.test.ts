import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { finnUgyldigeOverlappIUttaksplan } from './useLoggOverlappIVedtak';

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
