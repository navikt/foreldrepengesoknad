import { KontoBeregningDto, PeriodeDto_fpoversikt } from '@navikt/fp-types';

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
        const perioder: PeriodeDto_fpoversikt[] = [
            {
                fom: '2026-01-05',
                tom: '2026-04-16',
                annenPart: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2026-04-17',
                tom: '2026-04-17',
                søker: {
                    forelder: 'MOR',
                    kontoType: 'MØDREKVOTE',
                    utsettelseÅrsak: 'ARBEID',
                    flerbarnsdager: false,
                },
                annenPart: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                    flerbarnsdager: false,
                },
            },
        ];

        const resultat = getBrukteDager(KONTOER, perioder, '2026-03-16', 'fødsel');

        expect(resultat.farMedmor.dagerEgneKvoter).toBe(75);
        expect(resultat.mor.dagerEgneKvoter).toBe(0);
    });

    it.each([
        ['MØDREKVOTE' as const, (resultat: ReturnType<typeof getBrukteDager>) => resultat.mor.dagerEgneKvoter],
        ['FELLESPERIODE' as const, (resultat: ReturnType<typeof getBrukteDager>) => resultat.mor.dagerFellesperiode],
    ])('kobler oppholdsperiode med %s til riktig kvote', (kontoType, hentResultat) => {
        const periode: PeriodeDto_fpoversikt = {
            fom: '2026-04-17',
            tom: '2026-04-17',
            annenPart: {
                forelder: 'MOR',
                kontoType,
                flerbarnsdager: false,
            },
        };

        const resultat = getBrukteDager(KONTOER, [periode], '2026-03-16', 'fødsel');

        expect(hentResultat(resultat)).toBe(1);
    });
});
