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
    it.each([false, true])('teller BFHR-perioder på riktig konto uten dobbeltelling (vedtatt: %s)', (vedtatt) => {
        const kontoer: KontoBeregningDto = {
            ...KONTOER,
            kontoer: [
                { konto: 'FORELDREPENGER', dager: 150 },
                { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
            ],
        };
        const perioder: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-01-05',
                tom: '2026-01-09',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: vedtatt ? 'IKKE_OPPGITT' : 'ARBEID',
                flerbarnsdager: false,
                resultat: vedtatt
                    ? { innvilget: true, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' }
                    : undefined,
            },
            {
                fom: '2026-01-12',
                tom: '2026-01-23',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: vedtatt ? 'ARBEID' : 'IKKE_OPPGITT',
                flerbarnsdager: false,
                resultat: vedtatt
                    ? { innvilget: true, trekkerDager: true, trekkerMinsterett: true, årsak: 'ANNET' }
                    : undefined,
            },
        ];

        const resultat = getBrukteDager(kontoer, perioder, '2026-01-12', 'fødsel');
        const forventet = [
            { konto: 'FORELDREPENGER', dager: 5 },
            { konto: 'AKTIVITETSFRI_KVOTE', dager: 10 },
        ];

        expect(resultat.alle).toEqual(forventet);
        expect(resultat.farMedmor.alle).toEqual(forventet);
        expect(resultat.farMedmor.dagerTotalt).toBe(15);
        expect(resultat.farMedmor.førTermin).toEqual([{ konto: 'FORELDREPENGER', dager: 5 }]);
        expect(resultat.farMedmor.etterTermin).toEqual([{ konto: 'AKTIVITETSFRI_KVOTE', dager: 10 }]);
        expect(resultat.mor.dagerTotalt).toBe(0);
    });

    it.each(['FORELDREPENGER', 'AKTIVITETSFRI_KVOTE'] as const)(
        'beholder klassifiseringen når saken bare har %s',
        (konto) => {
            const kontoer: KontoBeregningDto = { ...KONTOER, kontoer: [{ konto, dager: 200 }] };
            const periode: UttakPeriode_fpoversikt = {
                fom: '2026-01-05',
                tom: '2026-01-09',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
            };

            const resultat = getBrukteDager(kontoer, [periode], '2026-01-05', 'fødsel');

            expect(resultat.alle).toEqual([{ konto, dager: 5 }]);
            expect(resultat.farMedmor.dagerTotalt).toBe(5);
        },
    );

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

        const resultat = getBrukteDager(KONTOER, perioder, '2026-03-16', 'fødsel');

        expect(resultat.farMedmor.dagerEgneKvoter).toBe(75);
        expect(resultat.mor.dagerEgneKvoter).toBe(0);
    });

    it.each([
        [
            'MØDREKVOTE_ANNEN_FORELDER' as const,
            (resultat: ReturnType<typeof getBrukteDager>) => resultat.mor.dagerEgneKvoter,
        ],
        [
            'FELLESPERIODE_ANNEN_FORELDER' as const,
            (resultat: ReturnType<typeof getBrukteDager>) => resultat.mor.dagerFellesperiode,
        ],
    ])('kobler %s til riktig kvote', (oppholdÅrsak, hentResultat) => {
        const periode: UttakPeriode_fpoversikt = {
            fom: '2026-04-17',
            tom: '2026-04-17',
            forelder: 'MOR',
            oppholdÅrsak,
            flerbarnsdager: false,
        };

        const resultat = getBrukteDager(KONTOER, [periode], '2026-03-16', 'fødsel');

        expect(hentResultat(resultat)).toBe(1);
    });
});
