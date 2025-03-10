import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { DATE_TODAY, ISO_DATE_REGEX, SIX_MONTHS_AGO, TIDENES_ENDE } from '@navikt/fp-constants';
import {
    halvannetÅrSiden,
    isDateRangesOverlapping,
    isDateWithinRange as isDateWithinRangeUtil,
} from '@navikt/fp-utils';

import { FormValidationResult, isEmpty } from './generalFormValidation';

dayjs.extend(isBetween);

const ATTEN_UKER_TRE_DAGER = dayjs().add(18, 'week').add(3, 'day').startOf('day').toDate();
const DATO_FOR_3_UKER_SIDEN = dayjs().startOf('day').subtract(21, 'days');
const ONE_YEAR_AFTER_TODAY = dayjs().add(1, 'year').startOf('day').toDate();

export const isValidDate =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        isEmpty(date) || ISO_DATE_REGEX.test(date) ? null : i18nText;

export const isWeekday =
    (i18nText: string) =>
    (date: string): FormValidationResult => {
        return dayjs(date).day() !== 0 && dayjs(date).day() !== 6 ? null : i18nText;
    };

export const isBeforeTodayOrToday =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isAfter(DATE_TODAY) ? i18nText : null;

export const isBeforeToday =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isBefore(DATE_TODAY) ? null : i18nText;

export const isBeforeOrSame =
    (i18nText: string, endDate: string | Dayjs | undefined) =>
    (startDate: string): FormValidationResult =>
        endDate && dayjs(startDate).isAfter(endDate, 'day') ? i18nText : null;

export const isBeforeDate =
    (i18nText: string, date1: string | Dayjs | undefined) =>
    (date2: string): FormValidationResult =>
        date1 && dayjs(date2).isBefore(date1, 'day') ? null : i18nText;

export const isAfterOrSameAsSixMonthsAgo =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isBefore(SIX_MONTHS_AGO) ? i18nText : null;

export const isAfterOrSame =
    (i18nText: string, fromDate: string | Dayjs | undefined) =>
    (endDate: string): FormValidationResult =>
        fromDate && dayjs(endDate).isBefore(fromDate, 'day') ? i18nText : null;

export const isAfterDate =
    (i18nText: string, fromDate: string | Dayjs | undefined) =>
    (endDate: string): FormValidationResult =>
        !fromDate || dayjs(endDate).isAfter(fromDate, 'day') ? null : i18nText;

export const isDatesNotTheSame =
    (i18nText: string, date1?: string) =>
    (date2?: string): FormValidationResult =>
        date1 && date2 && dayjs(date1).isSame(date2, 'day') ? i18nText : null;

export const isLessThanThreeWeeksAgo =
    (i18nText: string) =>
    (date: string): FormValidationResult => {
        return dayjs(date).isBefore(DATO_FOR_3_UKER_SIDEN) ? i18nText : null;
    };

export const isLessThanThreeWeeksBeforeFødsel =
    (i18nText: string, fødselsdato: string) =>
    (date: string): FormValidationResult => {
        return dayjs(date).isBefore(dayjs(fødselsdato).startOf('day').subtract(21, 'days')) ? i18nText : null;
    };

export const erI22SvangerskapsukeEllerSenere =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isAfter(ATTEN_UKER_TRE_DAGER) ? i18nText : null;

export const terminbekreftelsedatoMåVæreUtstedetEtter22Svangerskapsuke =
    (i18nText: string, termindato: string) =>
    (date: string): FormValidationResult => {
        const attenUkerOg3DagerFørTermindato = dayjs(termindato)
            .subtract(18, 'week')
            .subtract(3, 'day')
            .startOf('day')
            .toDate();

        return dayjs(date).isBefore(attenUkerOg3DagerFørTermindato) ? i18nText : null;
    };

export const isLessThanOneAndHalfYearsAgo =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isBefore(halvannetÅrSiden(new Date()), 'day') ? i18nText : null;

export const isMaxOneYearIntoTheFuture =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isAfter(ONE_YEAR_AFTER_TODAY) ? i18nText : null;

export const isDateWithinRange =
    (i18nText: string, start: Date, end: Date) =>
    (date: string): FormValidationResult =>
        isDateWithinRangeUtil(dayjs(date).toDate(), start, end) ? null : i18nText;

export const isPeriodNotOverlappingOthers =
    (
        i18nText: string,
        otherDateInfo: { date: Date | string; isStartDate: boolean },
        otherPeriods: Array<{ fom: Date | string; tom: Date | string }>,
    ) =>
    (date: string): FormValidationResult => {
        const dateRanges = otherPeriods
            .filter((u) => u.fom)
            .map((u) => ({
                from: dayjs(u.fom).toDate(),
                to: u.tom ? dayjs(u.tom).toDate() : TIDENES_ENDE,
            }));

        const toDate = otherDateInfo.isStartDate ? date : otherDateInfo.date;

        const allDateRanges = dateRanges.concat({
            from: dayjs(otherDateInfo.isStartDate ? otherDateInfo.date : date).toDate(),
            to: toDate ? dayjs(toDate).toDate() : TIDENES_ENDE,
        });

        return isDateRangesOverlapping(allDateRanges) ? i18nText : null;
    };
