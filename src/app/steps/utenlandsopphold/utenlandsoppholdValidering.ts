import {
    createFieldValidationError,
    date1YearAgo,
    date1YearFromNow,
    dateRangesCollide,
    dateRangesExceedsRange,
    formatDateExtended,
} from '@navikt/fp-common';
import dayjs from 'dayjs';
import { BostedUtland } from './bostedUtlandListAndDialog/types';

import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

type SkjemaelementFeil = React.ReactNode | boolean;

const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date) => {
    return dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
};

const validateDateInRange = (date: Date | undefined, minDate: Date, maxDate: Date, isFomDate: boolean) => {
    if (date === undefined) {
        if (isFomDate) {
            return {
                key: 'valideringsfeil.fraOgMedDato.gyldigDato',
            };
        }
        return {
            key: 'valideringsfeil.tilOgMedDato.gyldigDato',
        };
    }

    if (!dateIsWithinRange(date, minDate, maxDate)) {
        return {
            key: 'valideringsfeil.dateOutsideRange',
            values: {
                fom: formatDateExtended(minDate),
                tom: formatDateExtended(maxDate),
            },
        };
    }

    return undefined;
};

const validateFromDate = (date: Date | undefined, minDate: Date, maxDate: Date, toDate?: Date) => {
    const error = validateDateInRange(date, minDate, maxDate, true);
    if (error !== undefined) {
        return error;
    }
    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        return {
            key: 'valideringsfeil.utenlandsopphold.førTilDato',
        };
    }
    return undefined;
};

const validateToDate = (date: Date | undefined, minDate: Date, maxDate: Date, fromDate?: Date) => {
    const error = validateDateInRange(date, minDate, maxDate, false);
    if (error !== undefined) {
        return error;
    }
    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        return {
            key: 'valideringsfeil.utenlandsopphold.etterFraDato',
        };
    }
    return undefined;
};

export const dateRangeValidation = {
    validateToDate,
    validateFromDate,
};

export const validateUtenlandsoppholdNeste12Mnd = (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
    if (utenlandsopphold.length === 0) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.neste12Måneder.ikkeRegistrert');
    }

    const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

    if (dateRangesCollide(dateRanges)) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.overlapp');
    }
    if (dateRangesExceedsRange(dateRanges, { from: new Date(), to: date1YearFromNow })) {
        return createFieldValidationError('valideringsfeil.utenlandsoppholdUtenforPeriode');
    }
    return undefined;
};

export const validateUtenlandsoppholdSiste12Mnd = (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
    if (utenlandsopphold.length === 0) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.siste12Måneder.ikkeRegistrert');
    }

    const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

    if (dateRangesCollide(dateRanges)) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.overlapp');
    }
    if (dateRangesExceedsRange(dateRanges, { from: date1YearAgo, to: new Date() })) {
        return createFieldValidationError('valideringsfeil.utenlandsoppholdUtenforPeriode');
    }

    return undefined;
};
