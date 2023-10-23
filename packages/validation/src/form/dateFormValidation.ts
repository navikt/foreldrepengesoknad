import dayjs from 'dayjs';
import { DATE_TODAY, SIX_MONTHS_AGO } from '@navikt/fp-constants';
import isBetween from 'dayjs/plugin/isBetween';
import { FormValidationResult, isEmpty } from './generalFormValidation';

dayjs.extend(isBetween);

const ATTEN_UKER_TRE_DAGER = dayjs().add(18, 'week').add(3, 'day').startOf('day').toDate();
const DATO_FOR_3_UKER_SIDEN = dayjs().startOf('day').subtract(21, 'days');
const ONE_YEAR_AFTER_TODAY = dayjs().add(1, 'year').startOf('day').toDate();

const ISO_DATE_REGEX = /(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/;

export const isValidDate =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        isEmpty(date) || ISO_DATE_REGEX.test(date) ? null : i18nText;

export const isBeforeTodayOrToday =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isAfter(DATE_TODAY) ? i18nText : null;

export const isAfterOrSameAsSixMonthsAgo =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isBefore(SIX_MONTHS_AGO) ? i18nText : null;

export const isDatesNotTheSame =
    (i18nText: string, date1?: string) =>
    (date2?: string): FormValidationResult =>
        date1 && date2 && dayjs(date1).isSame(date2) ? i18nText : null;

export const isLessThanThreeWeeksAgo =
    (i18nText: string) =>
    (date: string): FormValidationResult => {
        return dayjs(date).isBefore(DATO_FOR_3_UKER_SIDEN) ? i18nText : null;
    };

export const erI22SvangerskapsukeEllerSenere =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isAfter(ATTEN_UKER_TRE_DAGER) ? i18nText : null;

export const isMaxOneYearIntoTheFuture =
    (i18nText: string) =>
    (date: string): FormValidationResult =>
        dayjs(date).isAfter(ONE_YEAR_AFTER_TODAY) ? i18nText : null;
