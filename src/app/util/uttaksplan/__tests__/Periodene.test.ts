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
        it('Skal finne overlappende perioder', () => {
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

        it('Skal finne overlapp om perioden dekkes av en annen periode', () => {
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

        it('Skal finne overlapp om perioden dekkes eksakt av en annen periode', () => {
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

        it('Skal ikke finne overlapp dersom det ikke er overlapp', () => {
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

        it('Skal ikke finne overlapp dersom det ikke er noen andre perioder', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-02-01'),
                    tom: new Date('2019-02-10')
                }
            };

            const result = Periodene([]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(0);
        });
    });

    describe('finnPeriodeMedDato', () => {
        it('Skal finne periode dersom startdato overlapper med en annen periode', () => {
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

        it('Skal ikke finne periode dersom startdato ikke overlapper med en annen periode', () => {
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

        it('Skal ikke finne en periode dersom det ikke er noen perioder', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-02-01'),
                    tom: new Date('2019-02-10')
                }
            };

            const result = Periodene([]).finnPeriodeMedDato((nyPeriode as Periode).tidsperiode.fom);
            expect(result).toBe(undefined);
        });
    });
});
