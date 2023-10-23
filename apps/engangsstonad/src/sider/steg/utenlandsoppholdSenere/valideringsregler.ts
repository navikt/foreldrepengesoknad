import { formatDateExtended } from '@navikt/fp-common';
import { isDateWithinRange } from '@navikt/fp-validation';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

// TODO Flytt desse

const validateDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    isFomDate: boolean,
) => {
    if (date === undefined) {
        if (isFomDate) {
            return intl.formatMessage({ id: 'Valideringsfeil.FraOgMedDato.GyldigDato' });
        }

        return intl.formatMessage({ id: 'Valideringsfeil.TilOgMedDato.GyldigDato' });
    }

    if (!isDateWithinRange(date, minDate, maxDate)) {
        return intl.formatMessage(
            { id: 'Valideringsfeil.DateOutsideRange' },
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
        return intl.formatMessage({ id: 'Valideringsfeil.Utenlandsopphold.FørTilDato' });
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
        return intl.formatMessage({ id: 'Valideringsfeil.Utenlandsopphold.EtterFraDato' });
    }
    return undefined;
};
