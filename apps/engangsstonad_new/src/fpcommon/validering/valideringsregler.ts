import { etterDagensDato, formatDateExtended, hasValue } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

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

    return undefined;
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
