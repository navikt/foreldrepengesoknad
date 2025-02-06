import { Forelder } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import Uttaksplanbuilder from './Uttaksplanbuilder';

const perioder: Planperiode[] = [
    {
        id: '1',
        fom: '2022-04-11',
        tom: '2022-04-29',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.ForeldrepengerFørFødsel,
        readOnly: false,
    },
    {
        id: '2',
        fom: '2022-05-02',
        tom: '2022-08-12',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false,
    },
    {
        id: '3',
        fom: '2022-08-15',
        tom: '2022-10-07',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false,
    },
];

const perioderMedToPerioderFørFødsel: Planperiode[] = [
    {
        id: '1',
        fom: '2021-12-06',
        tom: '2021-12-15',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false,
    },
    {
        id: '2',
        fom: '2021-12-16',
        tom: '2022-01-05',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.ForeldrepengerFørFødsel,
        readOnly: false,
    },
    {
        id: '3',
        fom: '2022-01-06',
        tom: '2022-05-18',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false,
    },
    {
        id: '4',
        fom: '2022-05-19',
        tom: '2022-07-01',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false,
    },
    {
        id: '5',
        fom: '2022-07-04',
        tom: '2022-07-15',
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
        readOnly: false,
    },
    {
        id: '6',
        fom: '2022-07-18',
        tom: '2022-09-23',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false,
    },
];

const perioderMedAnnenPartsUttakOgUtsettelserISlutten: Planperiode[] = [
    {
        id: '1',
        fom: '2021-08-18',
        tom: '2021-09-03',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.ForeldrepengerFørFødsel,
        readOnly: false,
    },
    {
        id: '2',
        fom: '2021-09-06',
        tom: '2021-09-10',
        forelder: Forelder.mor,
        utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
        readOnly: false,
    },
    {
        id: '3',
        fom: '2021-09-13',
        tom: '2021-12-10',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false,
    },
    {
        id: '4',
        fom: '2021-12-13',
        tom: '2021-12-31',
        forelder: Forelder.mor,
        utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
        readOnly: false,
    },
    {
        id: '5',
        fom: '2022-01-03',
        tom: '2022-01-07',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false,
    },
    {
        id: '6',
        fom: '2022-01-10',
        tom: '2022-04-29',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false,
    },
    {
        id: '7',
        fom: '2022-05-02',
        tom: '2022-05-10',
        forelder: Forelder.farMedmor,
        utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
        readOnly: true,
    },
    {
        id: '8',
        fom: '2022-05-11',
        tom: '2022-07-08',
        forelder: Forelder.farMedmor,
        kontoType: StønadskontoType.Fedrekvote,
        readOnly: true,
    },
    {
        id: '9',
        fom: '2022-07-11',
        tom: '2022-07-29',
        utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
        forelder: Forelder.farMedmor,
        readOnly: true,
    },
    {
        id: '10',
        fom: '2022-08-01',
        tom: '2022-09-13',
        forelder: Forelder.farMedmor,
        readOnly: true,
        kontoType: StønadskontoType.Fedrekvote,
    },
];

describe('Uttaksplanbuilder tester', () => {
    it('Å legge til en utsettelse skal ikke forskyve en annen utsettelse', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-08-15',
            tom: '2022-08-26',
            forelder: Forelder.mor,
            utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
            readOnly: false,
        };

        const result = Uttaksplanbuilder(perioder, '2022-05-02', false, false, false, false, undefined).leggTilPeriode(
            nyPeriode,
        );
        expect(result.length).toBe(4);
        expect(result[2]).toEqual(nyPeriode);

        const nyPeriode2: Planperiode = {
            id: '4',
            fom: '2022-05-23',
            tom: '2022-05-27',
            forelder: Forelder.mor,
            readOnly: false,
            utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
        };

        const result2 = Uttaksplanbuilder(result, '2022-05-02', false, false, false, false, undefined).leggTilPeriode(
            nyPeriode2,
        );

        expect(result2.length).toBe(6);
        expect(result2[2]).toEqual(nyPeriode2);
        expect(result2[4]).toEqual(nyPeriode);
        expect(result2[4].fom).toEqual('2022-08-15');
        expect(result2[4].tom).toEqual('2022-08-26');
    });
    it('Skal fungere med to perioder før fødsel i uttaksplan når man legger til en periode på slutten', () => {
        const nyPeriodeISluttenAvPlanen: Planperiode = {
            id: '6',
            fom: '2022-10-26',
            tom: '2022-11-11',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Mødrekvote,
            readOnly: false,
        };
        const result = Uttaksplanbuilder(
            perioderMedToPerioderFørFødsel,
            '2022-01-06',
            false,
            false,
            false,
            false,
            undefined,
        ).leggTilPeriode(nyPeriodeISluttenAvPlanen);

        expect(result.length).toEqual(8);
        expect(result[0]).toEqual(perioderMedToPerioderFørFødsel[0]);
        expect(result[1]).toEqual(perioderMedToPerioderFørFødsel[1]);
        expect(result[2]).toEqual(perioderMedToPerioderFørFødsel[2]);
        expect(result[3]).toEqual(perioderMedToPerioderFørFødsel[3]);
        expect(result[4]).toEqual(perioderMedToPerioderFørFødsel[4]);
        expect(result[5]).toEqual(perioderMedToPerioderFørFødsel[5]);
        expect(result[6].fom).toEqual('2022-09-26');
        expect(result[6].tom).toEqual('2022-10-25');
        expect(result[7]).toEqual(nyPeriodeISluttenAvPlanen);
    });
    it(
        'I en endringssøknad (med opprinnelig plan), skal legge til utsettelse etter annen parts uttak når ' +
            'ingen overlap uten å påvirke de andre periodene',
        () => {
            const originaleTidsperiodePerioder = perioderMedAnnenPartsUttakOgUtsettelserISlutten.map((periode) => {
                return { fom: periode.fom, tom: periode.tom };
            });
            const nyUtsettelseISluttenAvPlanen: Planperiode = {
                id: '11',
                fom: '2022-09-14',
                tom: '2022-09-16',
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
                readOnly: false,
            };
            const result = Uttaksplanbuilder(
                perioderMedAnnenPartsUttakOgUtsettelserISlutten,
                '2021-09-04',
                false,
                false,
                false,
                false,
                undefined,
                perioderMedAnnenPartsUttakOgUtsettelserISlutten,
            ).leggTilPeriode(nyUtsettelseISluttenAvPlanen);

            expect(result.length).toEqual(11);
            perioderMedAnnenPartsUttakOgUtsettelserISlutten.forEach((p, index) => {
                const resultPeriode = result[index];
                const opprinneligPeriode = p;
                const opprinneligTidsperiode = originaleTidsperiodePerioder[index];
                expect({ fom: resultPeriode.fom, tom: resultPeriode.tom }).toEqual(opprinneligTidsperiode);
                expect(resultPeriode.forelder).toEqual(opprinneligPeriode.forelder);
            });
            expect(result[10]).toEqual(nyUtsettelseISluttenAvPlanen);
        },
    );
});
