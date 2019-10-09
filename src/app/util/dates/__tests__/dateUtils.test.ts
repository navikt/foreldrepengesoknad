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
    yesterday
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
    getEndringstidspunkt
} from '../dates';

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
            tom: tomorrow.toDate()
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
            const endringstidspunkt = getEndringstidspunkt(false, new Date(), new Date());

            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal returnere eldste dato', () => {
            let endringstidspunkt = getEndringstidspunkt(true, new Date('2019-01-01'), new Date('2019-02-01'));

            expect(endringstidspunkt).toEqual(new Date('2019-01-01'));

            endringstidspunkt = getEndringstidspunkt(true, new Date('2019-02-01'), new Date('2019-01-01'));

            expect(endringstidspunkt).toEqual(new Date('2019-01-01'));
        });

        it('Skal fungere med en dato som undefined', () => {
            let endringstidspunkt = getEndringstidspunkt(true, new Date('2019-01-01'), undefined);

            expect(endringstidspunkt).toEqual(new Date('2019-01-01'));

            endringstidspunkt = getEndringstidspunkt(true, undefined, new Date('2019-01-01'));

            expect(endringstidspunkt).toEqual(new Date('2019-01-01'));
        });

        it('Skal returnere undefined hvis begge datoer er undefined', () => {
            const endringstidspunkt = getEndringstidspunkt(true, undefined, undefined);

            expect(endringstidspunkt).toEqual(undefined);
        });

        it('Skal returnere en dato om begge er samme dato', () => {
            const endringstidspunkt = getEndringstidspunkt(true, new Date('2019-01-01'), new Date('2019-01-01'));

            expect(endringstidspunkt).toEqual(new Date('2019-01-01'));
        });
    });
});
