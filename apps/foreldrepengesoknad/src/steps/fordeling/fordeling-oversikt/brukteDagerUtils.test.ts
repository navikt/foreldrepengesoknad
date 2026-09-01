import { KontoBeregningDto, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { getBrukteDager } from './brukteDagerUtils';

const KONTOER: KontoBeregningDto = {
    kontoer: [
        { konto: 'MØDREKVOTE', dager: 75 },
        { konto: 'FEDREKVOTE', dager: 75 },
        { konto: 'FELLESPERIODE', dager: 80 },
    ],
    minsteretter: { farRundtFødsel: 0, toTette: 0 },
    tillegg: { flerbarn: 0, prematur: 0 },
};

describe('getBrukteDager', () => {
    it('teller en oppholdsdag som fedrekvote når mor har utsettelse samme dag', () => {
        const perioder: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-01-05',
                tom: '2026-04-16',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-04-17',
                tom: '2026-04-17',
                forelder: 'FAR_MEDMOR',
                oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER',
                flerbarnsdager: false,
            },
            {
                fom: '2026-04-17',
                tom: '2026-04-17',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                utsettelseÅrsak: 'ARBEID',
                flerbarnsdager: false,
            },
        ];

        const resultat = getBrukteDager(KONTOER, perioder, '2026-03-16', true);

        expect(resultat.farMedmor.dagerEgneKvoter).toBe(75);
        expect(resultat.mor.dagerEgneKvoter).toBe(0);
    });

    it.each([
        {
            navn: 'MODREKVOTE_ANNEN_FORELDER',
            oppholdÅrsak: 'MØDREKVOTE_ANNEN_FORELDER' as const,
            forelder: 'MOR' as const,
            hentResultat: (resultat: ReturnType<typeof getBrukteDager>) => resultat.mor.dagerEgneKvoter,
        },
        {
            navn: 'FELLESPERIODE_ANNEN_FORELDER',
            oppholdÅrsak: 'FELLESPERIODE_ANNEN_FORELDER' as const,
            forelder: 'MOR' as const,
            hentResultat: (resultat: ReturnType<typeof getBrukteDager>) => resultat.mor.dagerFellesperiode,
        },
    ])('kobler $navn til riktig kvote', ({ oppholdÅrsak, forelder, hentResultat }) => {
        const periode: UttakPeriode_fpoversikt = {
            fom: '2026-04-17',
            tom: '2026-04-17',
            forelder,
            oppholdÅrsak,
            flerbarnsdager: false,
        };

        const resultat = getBrukteDager(KONTOER, [periode], '2026-03-16', true);

        expect(hentResultat(resultat)).toBe(1);
    });
});
