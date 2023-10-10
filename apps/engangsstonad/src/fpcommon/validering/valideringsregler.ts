import { etterDagensDato, formatDateExtended, hasValue } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

type FormValidationResult = string | null;

export const isoDateRegex = /(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/;

export const dateToday = dayjs().toDate();

export const isEmpty = (text?: string | number | boolean | dayjs.Dayjs | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;

export const isRequired =
    (errorMessage: string) =>
    (value?: string | number): FormValidationResult =>
        isEmpty(value) ? errorMessage : null;

export const isValidDate =
    (errorMessage: string) =>
    (text: string): FormValidationResult =>
        isEmpty(text) || isoDateRegex.test(text) ? null : errorMessage;

export const isAfterToday =
    (errorMessage: string) =>
    (dato: string): FormValidationResult => {
        return dayjs(dato).isAfter(dateToday) ? errorMessage : null;
    };

export const validateDatesNotEqual = (errorMessage: string, date1?: string) => (date2?: string) =>
    date1 && date2 && dayjs(date1).isSame(date2) ? errorMessage : null;

const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date) => {
    return dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
};

const validateDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    isFomDate: boolean,
) => {
    if (date === undefined) {
        if (isFomDate) {
            return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.gyldigDato' });
        }

        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' });
    }

    if (!dateIsWithinRange(date, minDate, maxDate)) {
        return intl.formatMessage(
            { id: 'valideringsfeil.dateOutsideRange' },
            {
                fom: formatDateExtended(minDate),
                tom: formatDateExtended(maxDate),
            },
        );
    }

    return null;
};

export const validateFromDate = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    toDate?: Date,
) => {
    const error = validateDateInRange(intl, date, minDate, maxDate, true);
    if (error !== undefined) {
        return error;
    }
    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        // TODO Bør ha generell id
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsopphold.førTilDato' });
    }
    return undefined;
};

export const validateToDate = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    fromDate?: Date,
) => {
    const error = validateDateInRange(intl, date, minDate, maxDate, false);
    if (error !== undefined) {
        return error;
    }
    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        // TODO Bør ha generell id
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsopphold.etterFraDato' });
    }
    return undefined;
};

export const isValidFormattedDateString = (dateString = ''): boolean => {
    return /\d{1,2}.\d{1,2}.(\d{2}|\d{4})$/.test(dateString);
};

//TODO Denne kan vel skrivast meir generell og ha generelle feilmeldingar?
export const validateAdopsjonFødselDate = (
    dato: string | undefined,
    adopsjonsdato: string | undefined,
    intl: IntlShape,
) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fodselsdato.duMåOppgi' });
    }

    if (!isValidFormattedDateString(dato)) {
        return intl.formatMessage({ id: 'invalidFormatErrorKey.fødselsdato' });
    }

    if (!dato || !adopsjonsdato) {
        return undefined;
    }
    if (etterDagensDato(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fodselsdato.måVæreIdagEllerTidligere' });
    }
    return undefined;
};
