import { Validator } from 'common/lib/validation/types/index';
import { today } from './values';
import { Avgrensninger } from 'nav-datovelger';
import { DateValue } from '../../types/common';
import { Tidsperiode } from 'common/types/index';
import {
    dateIs1YearAheadAtLatest,
    dateIs1YearBeforeAtEarliest,
    dateIs3YearsAgoOrLater,
    dateIsNotInFuture,
    dateIsSameOrAfter,
    dateIsSameOrBefore,
    timeintervalsOverlap
} from '../dates/dates';

export const hasValueRule = (v: any, failText: string): Validator => ({
    test: () => v !== undefined && v !== '',
    failText
});

export const dateIsNotInFutureRule = (date: DateValue, failText: string): Validator => ({
    test: () => dateIsNotInFuture(date),
    failText
});

export const dateIs3YearsAgoOrLaterRule = (date: DateValue, failText: string): Validator => ({
    test: () => dateIs3YearsAgoOrLater(date),
    failText
});

export const dateIs1YearAheadAtLatestRule = (date: DateValue, failText: string): Validator => ({
    test: () => dateIs1YearAheadAtLatest(date),
    failText
});

export const dateIs1YearBeforeAtEarliestRule = (date: DateValue, failText: string): Validator => ({
    test: () => dateIs1YearBeforeAtEarliest(date),
    failText
});

export const dateIsSameOrBeforeRule = (date: DateValue, otherDate: DateValue, failText: string): Validator => ({
    test: () => dateIsSameOrBefore(date, otherDate),
    failText
});

export const dateIsSameOrAfterRule = (date: DateValue, otherDate: DateValue, failText: string): Validator => ({
    test: () => dateIsSameOrAfter(date, otherDate),
    failText
});

export const timeintervalsDoNotOverlapRule = (
    timeinterval: Partial<Tidsperiode>,
    otherTimeintervals: Tidsperiode[],
    failText: string
): Validator => ({
    test: () => !timeintervalsOverlap(timeinterval, otherTimeintervals),
    failText
});

export const notInFutureAvgrensning: Avgrensninger = {
    maksDato: today.toDate()
};
