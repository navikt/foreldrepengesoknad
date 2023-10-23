import { hasValue, intlUtils, validateTextInputField } from '@navikt/fp-common';
import { SkjemaelementFeil } from 'app/types/SkjemaelementFeil';
import { IntlShape } from 'react-intl';
import { isFødselsnummerFormatValid, isSixteenOrOlder } from './validation/fødselsnummer';

export const validateFødselsnummer =
    (intl: IntlShape, søkersFødselsnummer: string, label: string, erUtenlandskFnr?: boolean) =>
    (fnr: string): string | undefined => {
        if (erUtenlandskFnr) {
            if (fnr === undefined || fnr.trim() === '') {
                return intlUtils(intl, 'valideringsfeil.fødselsnummer.required');
            }
            return validateTextInputField(fnr, label, intl);
        }

        if (fnr === søkersFødselsnummer) {
            return intlUtils(intl, 'valideringsfeil.fødselsnummer.ugyldigEgetFødselsnummer');
        }

        const validFnrResult = isFødselsnummerFormatValid(fnr);

        if (!erUtenlandskFnr && !isSixteenOrOlder(fnr, validFnrResult) && validFnrResult === 'fnr') {
            return intlUtils(intl, 'valideringsfeil.fødselsnummer.underSeksten');
        }

        return validFnrResult === 'fnr' || validFnrResult === 'dnr' || validFnrResult === 'hnr'
            ? undefined
            : intlUtils(intl, 'valideringsfeil.fødselsnummer.ugyldigFødselsnummer');
    };

export const validateRequiredField = (value: any, label: string, intl: IntlShape): SkjemaelementFeil => {
    if (!hasValue(value) || (typeof value === 'string' && value.trim() === '')) {
        return intlUtils(intl, 'valideringsfeil.inputfelt.required', { inputFeltLabel: label });
    }
    return undefined;
};

export const validateRequiredTextInputField =
    (feltNavn: string, intl: IntlShape) =>
    (value: string): SkjemaelementFeil => {
        const requiredFieldIsEmptyError = validateRequiredField(value, feltNavn, intl);
        if (requiredFieldIsEmptyError) {
            return requiredFieldIsEmptyError;
        }

        return validateTextInputField(value, feltNavn, intl);
    };
