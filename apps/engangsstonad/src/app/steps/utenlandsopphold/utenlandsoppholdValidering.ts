import {
    date1YearAgo,
    date1YearFromNow,
    dateRangesCollide,
    dateRangesExceedsRange,
    formatDateExtended,
    intlUtils,
} from '@navikt/fp-common';
import dayjs from 'dayjs';
import { BostedUtland } from './bostedUtlandListAndDialog/types';
import isBetween from 'dayjs/plugin/isBetween';
import { IntlShape } from 'react-intl';

dayjs.extend(isBetween);

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
        return intlUtils(intl, 'valideringsfeil.dateOutsideRange', {
            fom: formatDateExtended(minDate),
            tom: formatDateExtended(maxDate),
        });
    }

    return undefined;
};

const validateFromDate = (intl: IntlShape, date: Date | undefined, minDate: Date, maxDate: Date, toDate?: Date) => {
    const error = validateDateInRange(intl, date, minDate, maxDate, true);
    if (error !== undefined) {
        return error;
    }
    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        return intlUtils(intl, 'valideringsfeil.utenlandsopphold.førTilDato');
    }
    return undefined;
};

const validateToDate = (intl: IntlShape, date: Date | undefined, minDate: Date, maxDate: Date, fromDate?: Date) => {
    const error = validateDateInRange(intl, date, minDate, maxDate, false);
    if (error !== undefined) {
        return error;
    }
    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        return intlUtils(intl, 'valideringsfeil.utenlandsopphold.etterFraDato');
    }
    return undefined;
};

export const dateRangeValidation = {
    validateToDate,
    validateFromDate,
};

export const validateUtenlandsoppholdNeste12Mnd = (utenlandsopphold: BostedUtland[], intl: IntlShape) => {
    if (utenlandsopphold.length === 0) {
        return intlUtils(intl, 'valideringsfeil.utenlandsopphold.neste12Måneder.ikkeRegistrert');
    }

    const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

    if (dateRangesCollide(dateRanges)) {
        return intlUtils(intl, 'valideringsfeil.utenlandsopphold.overlapp');
    }
    if (dateRangesExceedsRange(dateRanges, { from: new Date(), to: date1YearFromNow })) {
        return intlUtils(intl, 'valideringsfeil.utenlandsoppholdUtenforPeriode');
    }
    return undefined;
};

export const validateUtenlandsoppholdSiste12Mnd = (utenlandsopphold: BostedUtland[], intl: IntlShape) => {
    if (utenlandsopphold.length === 0) {
        return intlUtils(intl, 'valideringsfeil.utenlandsopphold.siste12Måneder.ikkeRegistrert');
    }

    const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

    if (dateRangesCollide(dateRanges)) {
        return intlUtils(intl, 'valideringsfeil.utenlandsopphold.overlapp');
    }
    if (dateRangesExceedsRange(dateRanges, { from: date1YearAgo, to: new Date() })) {
        return intlUtils(intl, 'valideringsfeil.utenlandsoppholdUtenforPeriode');
    }

    return undefined;
};
