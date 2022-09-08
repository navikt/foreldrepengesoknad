import { Forelder } from 'app/types/Forelder';
import { InfoPeriode, Periode, Periodetype, Utsettelsesperiode, Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import Uttaksplanbuilder from './Uttaksplanbuilder';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { PeriodeInfoType } from 'uttaksplan/types/PeriodeInfoType';

const perioder: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-11'),
            tom: new Date('2022-04-29'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-02'),
            tom: new Date('2022-08-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-15'),
            tom: new Date('2022-10-07'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const perioderMedToPerioderFørFødsel: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2021-12-06'),
            tom: new Date('2021-12-15'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2021-12-16'),
            tom: new Date('2022-01-05'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-01-06'),
            tom: new Date('2022-05-18'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-19'),
            tom: new Date('2022-07-01'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
    {
        id: '5',
        type: Periodetype.PeriodeUtenUttak,
        tidsperiode: {
            fom: new Date('2022-07-04'),
            tom: new Date('2022-07-15'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
    {
        id: '6',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-07-18'),
            tom: new Date('2022-09-23'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const perioderMedAnnenPartsUttakOgUtsettelserISlutten: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2021-08-18'),
            tom: new Date('2021-09-03'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Utsettelse,
        tidsperiode: {
            fom: new Date('2021-09-06'),
            tom: new Date('2021-09-10'),
        },
        forelder: Forelder.mor,
    } as Utsettelsesperiode,
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2021-09-13'),
            tom: new Date('2021-12-10'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '4',
        type: Periodetype.Utsettelse,
        tidsperiode: {
            fom: new Date('2021-12-13'),
            tom: new Date('2021-12-31'),
        },
        forelder: Forelder.mor,
    } as Utsettelsesperiode,
    {
        id: '5',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-01-03'),
            tom: new Date('2022-01-07'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '6',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-01-10'),
            tom: new Date('2022-04-29'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
    {
        id: '7',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-05-02'),
            tom: new Date('2022-05-10'),
        },
        infotype: PeriodeInfoType.utsettelseAnnenPart,
        forelder: Forelder.farMedmor,
        overskrives: true,
        visPeriodeIPlan: true,
    } as InfoPeriode,
    {
        id: '8',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-05-11'),
            tom: new Date('2022-07-08'),
        },
        infotype: PeriodeInfoType.uttakAnnenPart,
        forelder: Forelder.farMedmor,
        overskrives: true,
        visPeriodeIPlan: true,
    } as InfoPeriode,
    {
        id: '9',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-07-11'),
            tom: new Date('2022-07-29'),
        },
        infotype: PeriodeInfoType.utsettelseAnnenPart,
        forelder: Forelder.farMedmor,
        overskrives: true,
        visPeriodeIPlan: true,
    } as InfoPeriode,
    {
        id: '10',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-08-01'),
            tom: new Date('2022-09-13'),
        },
        infotype: PeriodeInfoType.uttakAnnenPart,
        forelder: Forelder.farMedmor,
        overskrives: true,
        visPeriodeIPlan: true,
    } as InfoPeriode,
];

describe('Uttaksplanbuilder tester', () => {
    it('Å legge til en utsettelse skal ikke forskyve en annen utsettelse', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Utsettelse,
            tidsperiode: {
                fom: new Date('2022-08-15'),
                tom: new Date('2022-08-26'),
            },
            forelder: Forelder.mor,
            erArbeidstaker: true,
            årsak: UtsettelseÅrsakType.Arbeid,
        };

        const result = Uttaksplanbuilder(perioder, new Date('2022-05-02'), false, false, false, false).leggTilPeriode(
            nyPeriode
        );

        expect(result.length).toBe(4);
        expect(result[2]).toEqual(nyPeriode);

        const nyPeriode2: Periode = {
            id: '4',
            type: Periodetype.Utsettelse,
            tidsperiode: {
                fom: new Date('2022-05-23'),
                tom: new Date('2022-05-27'),
            },
            forelder: Forelder.mor,
            erArbeidstaker: true,
            årsak: UtsettelseÅrsakType.Arbeid,
        };

        const result2 = Uttaksplanbuilder(result, new Date('2022-05-02'), false, false, false, false).leggTilPeriode(
            nyPeriode2
        );

        expect(result2.length).toBe(7);
        expect(result2[2]).toEqual(nyPeriode2);
        expect(result2[4]).toEqual(nyPeriode);
        expect(result2[4].tidsperiode).toEqual({ fom: new Date('2022-08-15'), tom: new Date('2022-08-26') });
    });
    it('Skal fungere med to perioder før fødsel i uttaksplan når man legger til en periode på slutten', () => {
        const nyPeriodeISluttenAvPlanen: Periode = {
            id: '6',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-10-26'),
                tom: new Date('2022-11-11'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Mødrekvote,
        };
        const result = Uttaksplanbuilder(
            perioderMedToPerioderFørFødsel,
            new Date('2022-01-06'),
            false,
            false,
            false,
            false
        ).leggTilPeriode(nyPeriodeISluttenAvPlanen);

        expect(result.length).toEqual(8);
        expect(result[0]).toEqual(perioderMedToPerioderFørFødsel[0]);
        expect(result[1]).toEqual(perioderMedToPerioderFørFødsel[1]);
        expect(result[2]).toEqual(perioderMedToPerioderFørFødsel[2]);
        expect(result[3]).toEqual(perioderMedToPerioderFørFødsel[3]);
        expect(result[4]).toEqual(perioderMedToPerioderFørFødsel[4]);
        expect(result[5]).toEqual(perioderMedToPerioderFørFødsel[5]);
        expect(result[6].tidsperiode.fom).toEqual(new Date('2022-09-26'));
        expect(result[6].tidsperiode.tom).toEqual(new Date('2022-10-25'));
        expect(result[7]).toEqual(nyPeriodeISluttenAvPlanen);
    });
    it('I en endringssøknad (med opprinnelig plan), skal legge til utsettelse etter annen parts uttak når ingen overlap uten å påvirke de andre periodene', () => {
        const originaleTidsperiodePerioder = perioderMedAnnenPartsUttakOgUtsettelserISlutten.map((periode) => {
            return { ...periode.tidsperiode };
        });
        const nyUtsettelseISluttenAvPlanen: Periode = {
            id: '11',
            type: Periodetype.Utsettelse,
            tidsperiode: {
                fom: new Date('2022-09-14'),
                tom: new Date('2022-09-16'),
            },
            forelder: Forelder.mor,
        } as Utsettelsesperiode;
        const result = Uttaksplanbuilder(
            perioderMedAnnenPartsUttakOgUtsettelserISlutten,
            new Date('2021-09-04'),
            false,
            false,
            false,
            false,
            perioderMedAnnenPartsUttakOgUtsettelserISlutten
        ).leggTilPeriode(nyUtsettelseISluttenAvPlanen);

        expect(result.length).toEqual(11);
        perioderMedAnnenPartsUttakOgUtsettelserISlutten.forEach((p, index) => {
            const resultPeriode = result[index] as Utsettelsesperiode | Uttaksperiode;
            const opprinneligPeriode = p as Utsettelsesperiode | Uttaksperiode;
            const opprinneligTidsperiode = originaleTidsperiodePerioder[index];
            expect(resultPeriode.tidsperiode).toEqual(opprinneligTidsperiode);
            expect(resultPeriode.type).toEqual(opprinneligPeriode.type);
            expect(resultPeriode.forelder).toEqual(opprinneligPeriode.forelder);
        });
        expect(result[10]).toEqual(nyUtsettelseISluttenAvPlanen);
    });
});
