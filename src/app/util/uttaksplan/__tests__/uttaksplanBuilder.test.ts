import { Utsettelsesperiode, Periodetype, UtsettelseÅrsakType, Periode } from '../../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode, StønadskontoType } from 'common/types';
import {
    splittPeriodeMedHelligdager,
    getFriperioderITidsperiode,
    finnHullIPerioder
} from '../builder/UttaksplanBuilder';
import addPeriode from '../builder/addPeriode';
import { Perioden } from '../Perioden';

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

describe('UttaksplanBuilder', () => {
    describe('splittPeriodeMedHelligdager', () => {
        it('should split jul 2018 med periodehull correctly', () => {
            const periode: Utsettelsesperiode = {
                id: 'sdf',
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.Ferie,
                tidsperiode: {
                    fom: new Date(2018, 11, 20),
                    tom: new Date(2018, 11, 28)
                },
                forelder: Forelder.mor,
                erArbeidstaker: false
            };

            const result = splittPeriodeMedHelligdager(periode);
            expect(result.length).toBe(3);
        });
        it('should split christmas and new years eve 2018/2019 med periodehull correctly', () => {
            const periode: Utsettelsesperiode = {
                id: 'sdf',
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.Ferie,
                tidsperiode: {
                    fom: new Date(2018, 11, 20),
                    tom: new Date(2019, 0, 5)
                },
                forelder: Forelder.mor,
                erArbeidstaker: false
            };

            const result = splittPeriodeMedHelligdager(periode);
            expect(result.length).toBe(5);
        });
    });

    describe('getFriperioderITidsperiode', () => {
        it('should find 2 friperioder during christmas and new year', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2018, 11, 20),
                tom: new Date(2019, 0, 3)
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(2);
        });
        it('should find 0 friperioder in february', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2019, 1, 1),
                tom: new Date(2019, 1, 27)
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(0);
        });
        it('should find 8 friperioder in 2018', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2018, 0, 1),
                tom: new Date(2018, 11, 31)
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(8);
        });
        it('should find 1. of january 2018', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2017, 11, 31),
                tom: new Date(2018, 0, 2)
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(1);
        });
        it('should not find 1. of january 2017 because it is a sunday (not uttaksdag)', () => {
            const tidsperiode: Tidsperiode = {
                fom: new Date(2016, 11, 31),
                tom: new Date(2017, 0, 2)
            };
            const result = getFriperioderITidsperiode(tidsperiode);
            expect(result.length).toBe(0);
        });
    });

    it('test', () => {
        const test = jest.fn().mockReturnValue({
            gjelderDagerBrukt: false,
            uttak: [{ konto: StønadskontoType.Foreldrepenger, dager: 15 }]
        });

        const nyPeriode: Partial<Periode> = {
            type: Periodetype.Utsettelse,
            årsak: UtsettelseÅrsakType.Ferie,
            tidsperiode: {
                fom: new Date('2019-01-31'),
                tom: new Date('2019-02-10')
            },
            forelder: Forelder.mor,
            erArbeidstaker: false
        };

        const result = addPeriode(
            test,
            [],
            nyPeriode as Periode,
            [{ konto: StønadskontoType.Foreldrepenger, dager: 50 }],
            new Date('2019-01-31'),
            false
        );

        expect(Perioden(result.updatedPlan[0]).erLik(nyPeriode as Periode));
    });

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
