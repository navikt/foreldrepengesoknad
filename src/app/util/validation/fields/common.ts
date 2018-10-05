import moment from 'moment';
import { Validator } from 'common/lib/validation/types';
import { date1YearAgo, date1YearAhead, date3YearsAgo, today, tomorrow } from '../values';
import { Avgrensninger } from 'nav-datovelger';
import { DateValue } from '../../../types/common';

export const hasValueRule = (v: any, failText: string): Validator => ({
    test: () => v !== undefined && v !== '',
    failText
});

export const dateIsNotInFutureRule = (date: DateValue, failText: string): Validator => ({
    test: () => moment(date).isBefore(tomorrow),
    failText
});

export const dateIs3YearsAgoOrLater = (date: DateValue, failText: string): Validator => ({
    test: () => moment(date).isSameOrAfter(date3YearsAgo),
    failText
});

export const dateIs1YearAheadAtLatest = (date: DateValue, failText: string): Validator => ({
    test: () => moment(date).isBetween(today, date1YearAhead.endOf('day')),
    failText
});

export const dateIs1YearBeforeAtEarliest = (date: DateValue, failText: string): Validator => ({
    test: () => moment(date).isBetween(date1YearAgo, today.endOf('day')),
    failText
});

export const notInFutureAvgrensning: Avgrensninger = {
    maksDato: today.toDate()
};
