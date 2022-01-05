import {
    date1YearAgo,
    date1YearAhead,
    date3YearsAgo,
    date5DaysAhead,
    dateMoreThan1YearAgo,
    dateMoreThan1YearAhead,
    dateMoreThan3YearsAgo,
    today,
    tomorrow,
    date15YearsAnd3MonthsAgo,
    dateMoreThan15YearsAnd3MonthsAgo,
    yesterday,
} from '../../validation/values';
import {
    dateIs1YearAheadOrLess,
    dateIs1YearAgoOrLess,
    dateIs3YearsAgoOrLess,
    dateIsNotInFuture,
    dateIsSameOrAfter,
    dateIsSameOrBefore,
    timeintervalsOverlap,
    dateIs15YearsAnd3MonthsAgoOrLess,
    dateIsTodayOrInFuture,
    dateIsInThePast,
    getEndringstidspunkt,
} from '../dates';
import {
    Periode,
    Uttaksperiode,
    Periodetype,
    PeriodeHull,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
} from 'app/types/uttaksplan/periodetyper';
import { guid } from 'nav-frontend-js-utils';

const opprinneligPlan: Partial<Periode>[] = [
    {
        id: '2203724966-2284-5396-14729-8277157806438',
        tidsperiode: {
            fom: new Date('2019-09-10T00:00:00.000Z'),
            tom: new Date('2019-09-30T00:00:00.000Z'),
        },
        type: Periodetype.Uttak,
    },
    {
        id: '96519825-01917-7239-1861-16148140669135',
        tidsperiode: {
            fom: new Date('2019-10-01T00:00:00.000Z'),
            tom: new Date('2020-01-13T00:00:00.000Z'),
        },
        type: Periodetype.Uttak,
    },
    {
        id: '3105926427-6496-7446-7246-02332065872239',
        tidsperiode: {
            fom: new Date('2020-01-14T00:00:00.000Z'),
            tom: new Date('2020-05-04T00:00:00.000Z'),
        },
        type: Periodetype.Uttak,
    },
];

describe('dateUtils', () => {
    it('dateIsNotInFuture', () => {
        expect(dateIsNotInFuture(tomorrow.toDate())).toBe(false);
        expect(dateIsNotInFuture(today.toDate())).toBe(true);
    });

    it('dateIsTodayOrInFuture', () => {
        expect(dateIsTodayOrInFuture(tomorrow.toDate())).toBe(true);
        expect(dateIsTodayOrInFuture(today.toDate())).toBe(true);
        expect(dateIsTodayOrInFuture(yesterday.toDate())).toBe(false);
    });

    it('dateIsInThePast', () => {
        expect(dateIsInThePast(tomorrow.toDate())).toBe(false);
        expect(dateIsInThePast(today.toDate())).toBe(false);
        expect(dateIsInThePast(yesterday.toDate())).toBe(true);
    });

    it('dateIs3YearsAgoOrLess', () => {
        expect(dateIs3YearsAgoOrLess(dateMoreThan3YearsAgo.toDate())).toBe(false);
        expect(dateIs3YearsAgoOrLess(date3YearsAgo.toDate())).toBe(true);
    });

    it('dateIs15YearsAnd15yearsAnd3MonthsAgoOrLess', () => {
        expect(dateIs15YearsAnd3MonthsAgoOrLess(dateMoreThan15YearsAnd3MonthsAgo.toDate())).toBe(false);
        expect(dateIs15YearsAnd3MonthsAgoOrLess(date15YearsAnd3MonthsAgo.toDate())).toBe(true);
    });

    it('dateIs1YearAheadOrLess', () => {
        expect(dateIs1YearAheadOrLess(dateMoreThan1YearAhead.toDate())).toBe(false);
        expect(dateIs1YearAheadOrLess(date1YearAhead.toDate())).toBe(true);
    });

    it('dateIs1YearAgoOrLess', () => {
        expect(dateIs1YearAgoOrLess(dateMoreThan1YearAgo.toDate())).toBe(false);
        expect(dateIs1YearAgoOrLess(date1YearAgo.toDate())).toBe(true);
    });

    it('dateIsSameOrBefore', () => {
        expect(dateIsSameOrBefore(today.toDate(), today.toDate())).toBe(true);
        expect(dateIsSameOrBefore(today.toDate(), tomorrow.toDate())).toBe(true);
        expect(dateIsSameOrBefore(tomorrow.toDate(), today.toDate())).toBe(false);
    });

    it('dateIsSameOrAfter', () => {
        expect(dateIsSameOrAfter(today.toDate(), today.toDate())).toBe(true);
        expect(dateIsSameOrAfter(tomorrow.toDate(), today.toDate())).toBe(true);
        expect(dateIsSameOrAfter(today.toDate(), tomorrow.toDate())).toBe(false);
    });

    it('timeintervalsOverlap', () => {
        const fixedIntervals = [{ fom: today.toDate(), tom: date5DaysAhead.toDate() }];
        const overlap1 = {
            fom: date1YearAgo.toDate(),
            tom: tomorrow.toDate(),
        };
        const overlap2 = { fom: today.toDate(), tom: date5DaysAhead.toDate() };
        const overlap3 = { fom: date5DaysAhead.toDate(), tom: date1YearAhead.toDate() };
        const noOverlap = { fom: date3YearsAgo.toDate(), tom: date1YearAgo.toDate() };

        expect(timeintervalsOverlap(overlap1, fixedIntervals)).toBe(true);
        expect(timeintervalsOverlap(overlap2, fixedIntervals)).toBe(true);
        expect(timeintervalsOverlap(overlap3, fixedIntervals)).toBe(true);
        expect(timeintervalsOverlap(noOverlap, fixedIntervals)).toBe(false);
    });

    describe('getEndringstidspunkt', () => {
        it('Skal returnere undefined hvis ikke endringssøknad', () => {
            const endringstidspunkt = getEndringstidspunkt(undefined, [], false);

            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal returnere undefined for ingen endringer', () => {
            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlan as Periode[],
                [...opprinneligPlan] as Periode[],
                true
            );

            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal finne endringstidspunkt gitt at det er endringer', () => {
            const gradertPeriode: Partial<Uttaksperiode> = {
                id: guid(),
                tidsperiode: {
                    fom: new Date('2019-05-05'),
                    tom: new Date('2019-05-08'),
                },
                type: Periodetype.Uttak,
                gradert: true,
                stillingsprosent: '50',
            };
            const endretPlan = [...opprinneligPlan, gradertPeriode];

            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
            expect(endringstidspunkt).toEqual(gradertPeriode.tidsperiode!.fom);
        });

        it('Hvis uttaksplanlogikken setter hull inn i planen skal det telle som en endring', () => {
            const hullPeriode: Partial<PeriodeHull> = {
                type: Periodetype.Hull,
                tidsperiode: {
                    fom: new Date('2019-09-01'),
                    tom: new Date('2019-09-09'),
                },
            };
            const endretPlan = [hullPeriode, ...opprinneligPlan];
            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

            expect(endringstidspunkt).toBe(hullPeriode.tidsperiode!.fom);
        });

        it('Hvis uttaksplanlogikken deler en periode skal endringstidspunkt være fra delingen og fremover ikke ta med tidligere del av perioden', () => {
            const deltPeriodeTidligereDel: Partial<Uttaksperiode> = {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2020-01-14T00:00:00.000Z'),
                    tom: new Date('2020-04-03T00:00:00.000Z'),
                },
                type: Periodetype.Uttak,
            };
            const periodeSomDeltePeriode: Partial<Utsettelsesperiode> = {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2020-04-06T00:00:00.000Z'),
                    tom: new Date('2020-04-17T00:00:00.000Z'),
                },
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.Arbeid,
            };
            const deltPeriodeSenereDel: Partial<Uttaksperiode> = {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2020-04-20T00:00:00.000Z'),
                    tom: new Date('2020-05-04T00:00:00.000Z'),
                },
                type: Periodetype.Uttak,
            };

            const endretPlan = [
                opprinneligPlan[0],
                opprinneligPlan[1],
                deltPeriodeTidligereDel,
                periodeSomDeltePeriode,
                deltPeriodeSenereDel,
            ];
            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

            expect(endringstidspunkt).toBe(periodeSomDeltePeriode.tidsperiode!.fom);
        });
        it('Hvis uttaksplanlogikken deler to perioder skal endringstidspunkt være fra delingen og fremover', () => {
            const deltPeriode2: Partial<Uttaksperiode> = {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2019-10-01T00:00:00.000Z'),
                    tom: new Date('2020-01-09T00:00:00.000Z'),
                },
                type: Periodetype.Uttak,
            };

            const nyPeriode: Partial<Utsettelsesperiode> = {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2020-01-10T00:00:00.000Z'),
                    tom: new Date('2020-04-02T00:00:00.000Z'),
                },
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.Fri,
            };
            const deltPeriode3: Partial<Uttaksperiode> = {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2020-04-05T00:00:00.000Z'),
                    tom: new Date('2020-05-04T00:00:00.000Z'),
                },
                type: Periodetype.Uttak,
            };

            const endretPlan = [opprinneligPlan[0], deltPeriode2, nyPeriode, deltPeriode3];
            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

            expect(endringstidspunkt).toBe(nyPeriode.tidsperiode!.fom);
        });
        it('Hvis endret periode er siste, har samme startdato som i opprinnelig plan men ulik sluttdato, skal endringstidspunkt være starten på perioden .', () => {
            const nySistePeriode = {
                id: opprinneligPlan[2].id,
                tidsperiode: {
                    fom: opprinneligPlan[2].tidsperiode!.fom,
                    tom: new Date('2020-05-14T00:00:00.000Z'),
                },
                type: opprinneligPlan[2].type,
            };
            const endretPlan = [opprinneligPlan[0], opprinneligPlan[1], nySistePeriode];
            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

            expect(endringstidspunkt).toBe(nySistePeriode.tidsperiode.fom);
        });
        it('Hvis ingen opprinnelig plan, skal endringstidspunkt være startdatoen på første periode i endret plan.', () => {
            const tomOpprinneligPlan = [] as Periode[];
            const endretPlan = [opprinneligPlan[2], opprinneligPlan[3]];
            const endringstidspunkt = getEndringstidspunkt(tomOpprinneligPlan, endretPlan as Periode[], true);

            expect(endringstidspunkt).toBe(opprinneligPlan[2].tidsperiode!.fom);
        });

        it('Hvis periode er slettet i den nye planen skal endringstidspunkt være startdatoen på slettet periode.', () => {
            const endretPlan = [opprinneligPlan[0], opprinneligPlan[1]];
            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

            expect(endringstidspunkt).toBe(opprinneligPlan[2].tidsperiode!.fom);
        });
    });
});
