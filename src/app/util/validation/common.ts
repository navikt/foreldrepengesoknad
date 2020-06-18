import { Validator } from 'common/lib/validation/types/index';
import { today } from './values';
import { DateValue } from '../../types/common';
import { Avgrensninger, Tidsperiode } from 'common/types/index';
import {
    dateIs1YearAheadOrLess,
    dateIs1YearAgoOrLess,
    dateIs3YearsAgoOrLess,
    dateIsNotInFuture,
    dateIsSameOrAfter,
    dateIsSameOrBefore,
    timeintervalsOverlap,
    dateIs15YearsAnd3MonthsAgoOrLess,
} from '../dates/dates';
import { maxLengthIsGreaterThanOrEqualToStringLength } from '../stringUtils';

export const hasValueRule = (v: any, failText: string): Validator => ({
    test: () => v !== undefined && v !== '',
    failText,
});

export const maxLengthIsGreaterThanOrEqualToStringLengthRule = (
    maxLength: number,
    v: string,
    failText: string
): Validator => ({
    test: () => maxLengthIsGreaterThanOrEqualToStringLength(maxLength, v),
    failText,
});

export const dateIsNotInFutureRule = (date: DateValue, failText: string): Validator => ({
    test: () => dateIsNotInFuture(date),
    failText,
});

export const dateIs3YearsAgoOrLaterRule = (date: DateValue, failText: string): Validator => ({
    test: () => dateIs3YearsAgoOrLess(date),
    failText,
});

export const dateIs15YearsAnd3MonthsAgoOrLaterRule = (date: DateValue, failText: string): Validator => ({
    test: () => dateIs15YearsAnd3MonthsAgoOrLess(date),
    failText,
});

export const dateIs1YearAheadAtLatestRule = (date: DateValue, failText: string): Validator => ({
    test: () => dateIs1YearAheadOrLess(date),
    failText,
});

export const dateIs1YearBeforeAtEarliestRule = (date: DateValue, failText: string): Validator => ({
    test: () => dateIs1YearAgoOrLess(date),
    failText,
});

export const dateIsSameOrBeforeRule = (date: DateValue, otherDate: DateValue, failText: string): Validator => ({
    test: () => dateIsSameOrBefore(date, otherDate),
    failText,
});

export const dateIsSameOrAfterRule = (date: DateValue, otherDate: DateValue, failText: string): Validator => ({
    test: () => dateIsSameOrAfter(date, otherDate),
    failText,
});

export const timeintervalsDoNotOverlapRule = (
    timeinterval: Partial<Tidsperiode>,
    otherTimeintervals: Tidsperiode[],
    failText: string
): Validator => ({
    test: () => !timeintervalsOverlap(timeinterval, otherTimeintervals),
    failText,
});

export const notInFutureAvgrensning: Avgrensninger = {
    maksDato: today.toDate(),
};
