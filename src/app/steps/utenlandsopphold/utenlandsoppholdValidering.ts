import {
    date1YearAgo,
    date1YearFromNow,
    dateRangesCollide,
    dateRangesExceedsRange,
    formatDateExtended,
} from '@navikt/fp-common';
import dayjs from 'dayjs';
import { BostedUtland } from './bostedUtlandListAndDialog/types';

import isBetween from 'dayjs/plugin/isBetween';
import { IntlShape } from 'react-intl';

dayjs.extend(isBetween);

type SkjemaelementFeil = string | undefined;

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
            return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.gyldigDato' });
        }
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' });
    }

    if (!dateIsWithinRange(date, minDate, maxDate)) {
        if (isFomDate) {
            return intl.formatMessage(
                {
                    id: 'valideringsfeil.dateOutsideRange.fom',
                },
                {
                    fom: formatDateExtended(minDate),
                    tom: formatDateExtended(maxDate),
                }
            );
        }

        return intl.formatMessage(
            {
                id: 'valideringsfeil.dateOutsideRange.tom',
            },
            {
                fom: formatDateExtended(minDate),
                tom: formatDateExtended(maxDate),
            }
        );
    }

    return undefined;
};

const validateFromDate = (intl: IntlShape, date: Date | undefined, minDate: Date, maxDate: Date, toDate?: Date) => {
    const error = validateDateInRange(intl, date, minDate, maxDate, true);

    if (error !== undefined) {
        return error;
    }

    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsopphold.førTilDato' });
    }

    return undefined;
};

const validateToDate = (intl: IntlShape, date: Date | undefined, minDate: Date, maxDate: Date, fromDate?: Date) => {
    const error = validateDateInRange(intl, date, minDate, maxDate, false);

    if (error !== undefined) {
        return error;
    }

    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsopphold.etterFraDato' });
    }

    return undefined;
};

export const dateRangeValidation = {
    validateToDate,
    validateFromDate,
};

export const validateUtenlandsoppholdNeste12Mnd = (intl: IntlShape) => (
    utenlandsopphold: BostedUtland[]
): SkjemaelementFeil => {
    if (utenlandsopphold.length === 0) {
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsopphold.neste12Måneder.ikkeRegistrert' });
    }

    const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

    if (dateRangesCollide(dateRanges)) {
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsopphold.overlapp' });
    }

    if (dateRangesExceedsRange(dateRanges, { from: new Date(), to: date1YearFromNow })) {
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsoppholdUtenforPeriode' });
    }

    return undefined;
};

export const validateUtenlandsoppholdSiste12Mnd = (intl: IntlShape) => (
    utenlandsopphold: BostedUtland[]
): SkjemaelementFeil => {
    if (utenlandsopphold.length === 0) {
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsopphold.siste12Måneder.ikkeRegistrert' });
    }

    const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

    if (dateRangesCollide(dateRanges)) {
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsopphold.overlapp' });
    }

    if (dateRangesExceedsRange(dateRanges, { from: date1YearAgo, to: new Date() })) {
        return intl.formatMessage({ id: 'valideringsfeil.utenlandsoppholdUtenforPeriode' });
    }

    return undefined;
};
