import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
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

        const result = leggTilPeriode(perioder, nyPeriode);

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

        const result = leggTilPeriode(perioderMedHull, nyPeriode);

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

        const result2 = leggTilPeriode(perioderMedHull, nyPeriode2);

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

        const result = leggTilPeriode(periodeMedPeriodeUtenUttak, nyPeriode);

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

        const result2 = leggTilPeriode(periodeMedPeriodeUtenUttak, nyPeriode2);

        expect(result2.length).toEqual(6);
        expect(result2[2]).toEqual(nyPeriode2);
    });
});
