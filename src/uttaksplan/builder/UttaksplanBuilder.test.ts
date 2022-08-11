import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import Uttaksplanbuilder from './Uttaksplanbuilder';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';

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
});
