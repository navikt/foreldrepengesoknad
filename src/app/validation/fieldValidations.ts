import { SkjemaelementFeil } from 'common/lib/validation/types';
import { date1YearAgo, date1YearAhead } from 'app/util/validation/values';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import {
    isFødselsnummerFormatValid,
    isUtenlandskFødselsnummerValid,
    isSixteenOrOlder
} from 'app/util/validation/fødselsnummer';
import { dateRangesCollide, dateRangesExceedsRange } from 'app/util/dates/dates';
import { BostedUtland } from 'app/steg/utenlandsopphold/bostedUtlandListAndDialog/types';

export const validateYesOrNoIsAnswered = (answer: YesOrNo): string | undefined => {
    if (answer === YesOrNo.UNANSWERED || answer === undefined) {
        return 'Feltet er påkrevd';
    }
    return undefined;
};

export const validateAnnenForelderInformert = (answer: YesOrNo, fornavn: string): SkjemaelementFeil => {
    if (answer !== YesOrNo.YES) {
        return createFieldValidationError('erAnnenForelderInformert.veilederIkkeInformert', { navn: fornavn });
    }

    return undefined;
};

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

export const fieldIsRequiredError = () => createFieldValidationError('påkrevd');

export const validateRequiredField = (value: any): SkjemaelementFeil => {
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

export const validateFødselsnummer = (
    fnr: string,
    erUtenlandskFnr: boolean,
    søkersFødselsnummer: string
): SkjemaelementFeil => {
    const validFnrResult = isFødselsnummerFormatValid(fnr);

    if (erUtenlandskFnr) {
        return isUtenlandskFødselsnummerValid(fnr) ? undefined : createFieldValidationError('påkrevd');
    }

    if (fnr === søkersFødselsnummer) {
        return createFieldValidationError('valideringsfeil.fødselsnummer.ugyldigEgetFødselsnummer');
    }

    if (!erUtenlandskFnr && !isSixteenOrOlder(fnr, validFnrResult)) {
        return createFieldValidationError('valideringsfeil.fødselsnummer.underSeksten');
    }

    return validFnrResult === 'F'
        ? undefined
        : createFieldValidationError('valideringsfeil.fødselsnummer.ugyldigFødselsnummer');
};
