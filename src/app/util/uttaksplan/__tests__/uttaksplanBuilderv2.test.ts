import { Periode, Periodetype } from 'app/types/uttaksplan/periodetyper';
import { finnHullIPerioder } from '../builder/UttaksplanBuilderv2';

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

describe('Uttaksplanbuilder - v2', () => {
    describe('finnHullIPerioder', () => {
        it('Skal finne hull i en uttaksplan med hull', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-02-11'),
                    tom: new Date('2019-02-30')
                }
            };
            const perioderMedHull = [...perioder, nyPeriode];

            const hull = finnHullIPerioder(perioderMedHull as Periode[]);
            expect(hull.length).toBe(1);
            expect(hull[0].tidsperiode.fom).toEqual(new Date('2019-01-31'));
            expect(hull[0].tidsperiode.tom).toEqual(new Date('2019-02-08'));
        });

        it('Skal ikke regne helgedager som hull', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-01-31'),
                    tom: new Date('2019-02-01')
                }
            };
            const nyPeriode2: Partial<Periode> = {
                id: '5',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2019-02-04'),
                    tom: new Date('2019-02-08')
                }
            };
            const perioderMedHull = [...perioder, nyPeriode, nyPeriode2];

            const hull = finnHullIPerioder(perioderMedHull as Periode[]);
            expect(hull.length).toBe(0);
        });

        it('Skal ikke finne hull i en uttaksplan uten hull', () => {
            const hull = finnHullIPerioder(perioder as Periode[]);
            expect(hull.length).toBe(0);
        });

        it('Skal ikke finne hull i en tom uttaksplan', () => {
            const hull = finnHullIPerioder([]);
            expect(hull.length).toBe(0);
        });
    });
});
