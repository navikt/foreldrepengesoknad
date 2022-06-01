import { Forelder } from 'app/types/Forelder';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { PeriodeInfoType } from 'uttaksplan/types/PeriodeInfoType';
import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { leggTilPeriode } from './leggTilPeriode';

const perioder: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-14'),
            tom: new Date('2022-05-04'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-05'),
            tom: new Date('2022-08-17'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-18'),
            tom: new Date('2022-10-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const perioderMedHull: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-14'),
            tom: new Date('2022-05-04'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-05'),
            tom: new Date('2022-08-03'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Hull,
        tidsperiode: {
            fom: new Date('2022-08-04'),
            tom: new Date('2022-08-17'),
        },
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-18'),
            tom: new Date('2022-10-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const periodeMedPeriodeUtenUttak: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-14'),
            tom: new Date('2022-05-04'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-05'),
            tom: new Date('2022-08-03'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.PeriodeUtenUttak,
        tidsperiode: {
            fom: new Date('2022-08-04'),
            tom: new Date('2022-08-17'),
        },
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-18'),
            tom: new Date('2022-10-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const periodeMedAnnenPartsUttak: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-14'),
            tom: new Date('2022-05-04'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-05'),
            tom: new Date('2022-08-03'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-08-04'),
            tom: new Date('2022-08-17'),
        },
        forelder: Forelder.farMedmor,
        infotype: PeriodeInfoType.uttakAnnenPart,
        overskrives: true,
        visPeriodeIPlan: true,
        resultatType: PeriodeResultatType.INNVILGET,
        årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-18'),
            tom: new Date('2022-10-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const perioderMedFarsUttak: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-10-04'),
            tom: new Date('2022-12-12'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote,
    },
];

describe('Test av legg til periode i uttaksplan', () => {
    it('Burde legge til periode korrekt', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-11'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode(perioder, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(5);
        expect(result[2]).toEqual(nyPeriode);
    });

    it('Burde legge til periode korrekt når planen inneholder hull', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-11'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode(perioderMedHull, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(5);
        expect(result[2]).toEqual(nyPeriode);

        const nyPeriode2: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-18'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result2 = leggTilPeriode(perioderMedHull, nyPeriode2, new Date('2022-05-05'));

        expect(result2.length).toEqual(6);
        expect(result2[2]).toEqual(nyPeriode2);
    });

    it('Burde legge til periode korrekt når planen inneholder annen parts uttak', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-11'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode(periodeMedAnnenPartsUttak, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(5);
        expect(result[2]).toEqual(nyPeriode);

        const nyPeriode2: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-18'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result2 = leggTilPeriode(periodeMedAnnenPartsUttak, nyPeriode2, new Date('2022-05-05'));

        expect(result2.length).toEqual(6);
        expect(result2[2]).toEqual(nyPeriode2);
    });

    it('Burde legge til periode korrekt når planen inneholder perioder uten uttak', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-11'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode(periodeMedPeriodeUtenUttak, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(5);
        expect(result[2]).toEqual(nyPeriode);

        const nyPeriode2: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-18'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result2 = leggTilPeriode(periodeMedPeriodeUtenUttak, nyPeriode2, new Date('2022-05-05'));

        expect(result2.length).toEqual(6);
        expect(result2[2]).toEqual(nyPeriode2);
    });

    it('Burde bare innehold ny periode om planen er tom', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-11'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode([], nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(nyPeriode);
    });

    it('Burde legge til periode før første periode korrekt', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-03-31'),
                tom: new Date('2022-04-13'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode(perioder, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(4);
        expect(result[0]).toEqual(nyPeriode);
    });

    it('Burde legge til periode før første periode korrekt med periode uten uttak', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-03-31'),
                tom: new Date('2022-04-07'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode(perioder, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(5);
        expect(result[0]).toEqual(nyPeriode);
        expect(result[1].type).toEqual(Periodetype.PeriodeUtenUttak);
    });

    it('Burde legge til periode etter siste periode korrekt', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-10-13'),
                tom: new Date('2022-10-26'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode(perioder, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(4);
        expect(result[3]).toEqual(nyPeriode);
    });

    it('Burde legge til periode før første periode korrekt med periode uten uttak', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-10-26'),
                tom: new Date('2022-11-08'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode(perioder, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(5);
        expect(result[4]).toEqual(nyPeriode);
        expect(result[3].type).toEqual(Periodetype.PeriodeUtenUttak);
    });

    it('Skal legge til utsettelse korrekt', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Utsettelse,
            tidsperiode: {
                fom: new Date('2022-05-05'),
                tom: new Date('2022-05-18'),
            },
            forelder: Forelder.mor,
            erArbeidstaker: true,
            årsak: UtsettelseÅrsakType.Arbeid,
        };

        const result = leggTilPeriode(perioder, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(4);
        expect(result[1]).toEqual(nyPeriode);
        expect(result[2].tidsperiode.fom).toEqual(new Date('2022-05-19'));
        expect(result[2].tidsperiode.tom).toEqual(new Date('2022-08-31'));
    });

    it('Skal ignorere perioder hvis tidsperiode starter før famdato og ender etter', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-05-03'),
                tom: new Date('2022-05-06'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = leggTilPeriode(perioder, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(3);
    });

    it('Skal ta hensyn til overlappende dager og forskyve når ny periode legges inn i starten med overlapp', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-09-12'),
                tom: new Date('2022-10-14'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fedrekvote,
        };

        const result = leggTilPeriode(perioderMedFarsUttak, nyPeriode, new Date('2022-05-05'));

        expect(result.length).toEqual(2);
        expect(result[0].tidsperiode.fom).toEqual(nyPeriode.tidsperiode.fom);
        expect(result[0].tidsperiode.tom).toEqual(nyPeriode.tidsperiode.tom);
        expect(result[1].tidsperiode.fom).toEqual(new Date('2022-10-17'));
        expect(result[1].tidsperiode.tom).toEqual(new Date('2022-12-23'));
    });
});
