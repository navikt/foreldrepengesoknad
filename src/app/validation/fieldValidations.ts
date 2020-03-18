import { SkjemaelementFeil } from 'common/lib/validation/types';
import { BostedUtland } from '@navikt/sif-common-forms/lib/bosted-utland/types';
import { date1YearAgo, date1YearAhead } from 'app/util/validation/values';
import { dateRangesCollide, dateRangesExceedsRange } from '@navikt/sif-common-core/lib/utils/dateUtils';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

export const fieldIsRequiredError = () => createFieldValidationError('påkrevd');

export const validateRequiredSelect = (value: any): SkjemaelementFeil => {
    if (!hasValue(value)) {
        return fieldIsRequiredError();
    }
    return undefined;
};

export const createFieldValidationError = <T extends string>(key: T | undefined, values?: any): SkjemaelementFeil => {
    return key
        ? {
              key,
              values
          }
        : undefined;
};

export const validateUtenlandsoppholdSiste12Mnd = (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
    if (utenlandsopphold.length === 0) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold_ikke_registrert');
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.overlapp');
    }
    if (dateRangesExceedsRange(dateRanges, { from: date1YearAgo.toDate(), to: new Date() })) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold_utenfor_periode');
    }

    return undefined;
};

export const validateUtenlandsoppholdNeste12Mnd = (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
    if (utenlandsopphold.length === 0) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold_ikke_registrert');
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.overlapp');
    }
    if (dateRangesExceedsRange(dateRanges, { from: new Date(), to: date1YearAhead.toDate() })) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold_utenfor_periode');
    }
    return undefined;
};
