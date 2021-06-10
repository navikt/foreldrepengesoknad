import dayjs from 'dayjs';
import { isISODateString } from 'nav-datovelger';
import isBetween from 'dayjs/plugin/isBetween';
import { IntlShape } from 'react-intl';
import { formatDateExtended, hasValue, intlUtils } from '@navikt/fp-common';
import { SkjemaelementFeil } from 'app/types/SkjemaelementFeil';

dayjs.extend(isBetween);

export const date4YearsAgo = dayjs().subtract(4, 'year').startOf('day').toDate();

export const getDateFromDateString = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString)) {
        return new Date(dateString);
    }
    return undefined;
};

const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date) => {
    return dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
};

const validateDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    isFomDate: boolean
) => {
    if (date === undefined) {
        if (isFomDate) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
        }
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (!dateIsWithinRange(date, minDate, maxDate)) {
        if (isFomDate) {
            return intlUtils(intl, 'valideringsfeil.dateOutsideRange.fom', {
                fom: formatDateExtended(minDate),
                tom: formatDateExtended(maxDate),
            });
        }

        return intlUtils(intl, 'valideringsfeil.dateOutsideRange.tom', {
            fom: formatDateExtended(minDate),
            tom: formatDateExtended(maxDate),
        });
    }

    return undefined;
};

const validateFromDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    errorKey: string,
    toDate?: Date
): SkjemaelementFeil => {
    const error = validateDateInRange(intl, date, minDate, maxDate, true);

    if (error !== undefined) {
        return error;
    }

    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        return intlUtils(intl, errorKey);
    }

    return undefined;
};

const validateToDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    errorKey: string,
    fromDate?: Date
): SkjemaelementFeil => {
    const error = validateDateInRange(intl, date, minDate, maxDate, false);

    if (error !== undefined) {
        return error;
    }

    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        return intlUtils(intl, errorKey);
    }

    return undefined;
};

export const dateRangeValidation = {
    validateToDateInRange,
    validateFromDateInRange,
};

export const isDateABeforeDateB = (a: string, b: string): boolean => {
    if (!hasValue(a) || !hasValue(b) || !isISODateString(a) || !isISODateString(b)) {
        return false;
    }

    if (dayjs(a).isBefore(b, 'day')) {
        return true;
    }

    return false;
};

export const isDateInTheFuture = (date: string): boolean => {
    if (dayjs().isBefore(date)) {
        return true;
    }

    return false;
};
