import {
    date1YearAgo,
    date1YearAhead,
    date3YearsAgo,
    date5DaysAhead,
    dateMoreThan1YearAgo,
    dateMoreThan1YearAhead,
    dateMoreThan3YearsAgo,
    today,
    tomorrow
} from '../../validation/values';
import {
    dateIs1YearAheadAtLatest,
    dateIs1YearBeforeAtEarliest,
    dateIs3YearsAgoOrLater,
    dateIsNotInFuture,
    dateIsSameOrAfter,
    dateIsSameOrBefore,
    timeintervalsOverlap
} from '../dates';

describe('dateUtils', () => {
    it('dateIsNotInFuture', () => {
        expect(dateIsNotInFuture(tomorrow.toDate())).toBe(false);
        expect(dateIsNotInFuture(today.toDate())).toBe(true);
    });

    it('dateIs3YearsAgoOrLater', () => {
        expect(dateIs3YearsAgoOrLater(dateMoreThan3YearsAgo.toDate())).toBe(false);
        expect(dateIs3YearsAgoOrLater(date3YearsAgo.toDate())).toBe(true);
    });

    it('dateIs1YearAheadAtLatest', () => {
        expect(dateIs1YearAheadAtLatest(dateMoreThan1YearAhead.toDate())).toBe(false);
        expect(dateIs1YearAheadAtLatest(date1YearAhead.toDate())).toBe(true);
    });

    it('dateIs1YearBeforeAtEarliest', () => {
        expect(dateIs1YearBeforeAtEarliest(dateMoreThan1YearAgo.toDate())).toBe(false);
        expect(dateIs1YearBeforeAtEarliest(date1YearAgo.toDate())).toBe(true);
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
});
