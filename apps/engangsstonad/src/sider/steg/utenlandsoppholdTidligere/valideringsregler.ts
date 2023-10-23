import { formatDateExtended } from '@navikt/fp-common';
import { I18nFn } from '@navikt/fp-ui';
import { isDateWithinRange } from '@navikt/fp-utils';
import dayjs from 'dayjs';

// TODO Flytt desse

const validateDateInRange = (
    i18n: I18nFn,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    isFomDate: boolean,
) => {
    if (date === undefined) {
        if (isFomDate) {
            return i18n('Valideringsfeil.FraOgMedDato.GyldigDato');
        }

        return i18n('Valideringsfeil.TilOgMedDato.GyldigDato');
    }

    if (!isDateWithinRange(date, minDate, maxDate)) {
        return i18n('Valideringsfeil.DateOutsideRange', {
            fom: formatDateExtended(minDate),
            tom: formatDateExtended(maxDate),
        });
    }

    return null;
};

export const validateFromDate = (i18n: I18nFn, date: Date | undefined, minDate: Date, maxDate: Date, toDate?: Date) => {
    const error = validateDateInRange(i18n, date, minDate, maxDate, true);
    if (error !== undefined) {
        return error;
    }
    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        // TODO Bør ha generell id
        return i18n('Valideringsfeil.Utenlandsopphold.FørTilDato');
    }
    return undefined;
};

export const validateToDate = (i18n: I18nFn, date: Date | undefined, minDate: Date, maxDate: Date, fromDate?: Date) => {
    const error = validateDateInRange(i18n, date, minDate, maxDate, false);
    if (error !== undefined) {
        return error;
    }
    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        // TODO Bør ha generell id
        return i18n('Valideringsfeil.Utenlandsopphold.EtterFraDato');
    }
    return undefined;
};
