import { Periode, Periodetype } from 'app/types/uttaksplan/periodetyper';
import { Periodene } from '../Periodene';

const perioder: Array<Partial<Periode>> = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2019-01-01'),
            tom: new Date('2019-01-10')
        }
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2019-01-11'),
            tom: new Date('2019-01-20')
        }
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2019-01-21'),
            tom: new Date('2019-01-30')
        }
    }
];

describe('Periodene', () => {
    describe('finnOverlappendePerioder', () => {
        it('Should find overlappende perioder', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-01-05'),
                    tom: new Date('2019-01-15')
                }
            };

            const result = Periodene(perioder as Periode[]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(2);
        });

        it('Should find overlapp if periode is wholly contained in another periode', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-01-02'),
                    tom: new Date('2019-01-09')
                }
            };

            const result = Periodene(perioder as Periode[]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(1);
        });

        it('Should find overlapp if periode spans the exact same tidsperiode as another periode', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-01-01'),
                    tom: new Date('2019-01-10')
                }
            };

            const result = Periodene(perioder as Periode[]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(1);
        });

        it('Should not find overlap if none exists', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-02-01'),
                    tom: new Date('2019-02-10')
                }
            };

            const result = Periodene(perioder as Periode[]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(0);
        });
    });

    describe('finnPeriodeMedDato', () => {
        it('Should find periode if startdato does overlapp with any other periode', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-01-01'),
                    tom: new Date('2019-02-10')
                }
            };

            const result = Periodene(perioder as Periode[]).finnPeriodeMedDato((nyPeriode as Periode).tidsperiode.fom);
            expect(result).toBe(perioder[0]);
        });

        it('Should find no periode if startdato does not overlapp with any other periode', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-02-01'),
                    tom: new Date('2019-02-10')
                }
            };

            const result = Periodene(perioder as Periode[]).finnPeriodeMedDato((nyPeriode as Periode).tidsperiode.fom);
            expect(result).toBe(undefined);
        });
    });
});
