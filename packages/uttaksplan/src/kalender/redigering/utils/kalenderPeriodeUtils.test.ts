import { describe, expect, it } from 'vitest';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';

import { erVanligUttakPeriode } from '../../../types/UttaksplanPeriode';
import { finnPerioderMedEndretGradering, finnValgtePerioder } from './kalenderPeriodeUtils';

describe('finnValgtePerioder', () => {
    it('skal ikke slå sammen foreldrepenger uten og med aktivitetskrav til én periode (kun far har rett)', () => {
        const utenAktivitetskrav: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FORELDREPENGER',
            morsAktivitet: 'IKKE_OPPGITT',
            fom: '2024-01-01',
            tom: '2024-01-05',
            flerbarnsdager: false,
        };
        const medAktivitetskrav: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FORELDREPENGER',
            morsAktivitet: undefined,
            fom: '2024-01-08',
            tom: '2024-01-12',
            flerbarnsdager: false,
        };

        const valgtePerioder: CalendarPeriod[] = [{ fom: '2024-01-01', tom: '2024-01-12', color: 'BLUE', srText: '' }];

        const resultat = finnValgtePerioder(valgtePerioder, [utenAktivitetskrav, medAktivitetskrav]);

        expect(resultat).toHaveLength(2);
        const aktivitetsfri = resultat.find((p) => erVanligUttakPeriode(p) && p.morsAktivitet === 'IKKE_OPPGITT');
        const medKrav = resultat.find((p) => erVanligUttakPeriode(p) && p.morsAktivitet === undefined);
        expect(aktivitetsfri?.valgteDagerIPeriode).toBe(5);
        expect(medKrav?.valgteDagerIPeriode).toBe(5);
    });

    describe('finnPerioderMedEndretGradering', () => {
        const periode: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            fom: '2026-06-01',
            tom: '2026-07-31',
            flerbarnsdager: false,
        };
        const gradert: UttakPeriode_fpoversikt = {
            ...periode,
            gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ORDINÆRT_ARBEID', arbeidsgiver: { id: '1' } } },
        };

        it('finner overgang fra ugradert til gradert, også på nye datoer', () => {
            expect(finnPerioderMedEndretGradering([gradert], [periode], 'MOR', true)).toEqual([
                { fom: '2026-06-01', tom: '2026-07-31' },
            ]);
            expect(finnPerioderMedEndretGradering([gradert], [], 'MOR', true)).toEqual([
                { fom: '2026-06-01', tom: '2026-07-31' },
            ]);
        });

        it('finner endret og fjernet gradering', () => {
            const endret = { ...gradert, gradering: { ...gradert.gradering!, arbeidstidprosent: 60 } };
            expect(finnPerioderMedEndretGradering([endret], [gradert], 'MOR', true)).toHaveLength(1);
            expect(finnPerioderMedEndretGradering([periode], [gradert], 'MOR', true)).toHaveLength(1);
        });

        it.each([periode, gradert])('utelater rent kvotetypebytte med uendret gradering (%j)', (opprinnelig) => {
            expect(
                finnPerioderMedEndretGradering(
                    [{ ...opprinnelig, kontoType: 'FELLESPERIODE' }],
                    [opprinnelig],
                    'MOR',
                    true,
                ),
            ).toEqual([]);
        });

        it('finner bare datoene der graderingen faktisk endres når valget krysser månedsskiftet', () => {
            expect(
                finnPerioderMedEndretGradering(
                    [gradert],
                    [
                        { ...gradert, tom: '2026-06-30' },
                        { ...periode, fom: '2026-07-01' },
                    ],
                    'MOR',
                    true,
                ),
            ).toEqual([{ fom: '2026-07-01', tom: '2026-07-31' }]);
        });

        it('finner gradering på datoer før, mellom og etter eksisterende perioder', () => {
            expect(
                finnPerioderMedEndretGradering(
                    [gradert],
                    [
                        { ...gradert, fom: '2026-06-08', tom: '2026-06-12' },
                        { ...gradert, fom: '2026-07-06', tom: '2026-07-10' },
                    ],
                    'MOR',
                    true,
                ),
            ).toEqual([
                { fom: '2026-06-01', tom: '2026-06-07' },
                { fom: '2026-06-13', tom: '2026-07-05' },
                { fom: '2026-07-11', tom: '2026-07-31' },
            ]);
        });

        it('finner endret arbeidsaktivitet for søker, men ikke aktivitet som skjemaet ikke lar brukeren endre', () => {
            const endret: UttakPeriode_fpoversikt = {
                ...gradert,
                gradering: { ...gradert.gradering!, aktivitet: { type: 'ORDINÆRT_ARBEID', arbeidsgiver: { id: '2' } } },
            };
            expect(finnPerioderMedEndretGradering([endret], [gradert], 'MOR', true)).toHaveLength(1);
            expect(finnPerioderMedEndretGradering([endret], [gradert], 'MOR', false)).toEqual([]);
            expect(finnPerioderMedEndretGradering([endret], [gradert], 'FAR_MEDMOR', true)).toEqual([]);
        });

        it('sammenligner bare overlappet for samme forelder og lar andre perioder være uendret', () => {
            expect(
                finnPerioderMedEndretGradering(
                    [{ ...periode, fom: '2026-06-15', tom: '2026-06-19' }],
                    [gradert, { ...gradert, forelder: 'FAR_MEDMOR' }],
                    'MOR',
                    true,
                ),
            ).toEqual([{ fom: '2026-06-15', tom: '2026-06-19' }]);
            expect(finnPerioderMedEndretGradering([periode], [], 'MOR', true)).toEqual([]);
        });
    });
});
