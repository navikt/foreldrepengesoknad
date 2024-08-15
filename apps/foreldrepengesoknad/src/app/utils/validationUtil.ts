import { IntlShape } from 'react-intl';

import { hasValue, validateTextInputField } from '@navikt/fp-common';

import { SkjemaelementFeil } from 'app/types/SkjemaelementFeil';

import { isFødselsnummerFormatValid, isSixteenOrOlder } from './validation/fødselsnummer';

export const validateFødselsnummer =
    (intl: IntlShape, søkersFødselsnummer: string, label: string, erUtenlandskFnr?: boolean) =>
    (fnr: string): string | undefined => {
        if (erUtenlandskFnr) {
            if (fnr === undefined || fnr.trim() === '') {
                return intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.required' });
            }

            if (fnr.length > 50) {
                return intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.fødselsnummerForLangt' });
            }

            return validateTextInputField(fnr, label, intl);
        }

        if (fnr === søkersFødselsnummer) {
            return intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.ugyldigEgetFødselsnummer' });
        }

        const validFnrResult = isFødselsnummerFormatValid(fnr);

        if (!erUtenlandskFnr && !isSixteenOrOlder(fnr, validFnrResult) && validFnrResult === 'fnr') {
            return intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.underSeksten' });
        }

        return validFnrResult === 'fnr' || validFnrResult === 'dnr' || validFnrResult === 'hnr'
            ? undefined
            : intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.ugyldigFødselsnummer' });
    };

export const validateRequiredField = (value: any, label: string, intl: IntlShape): SkjemaelementFeil => {
    if (!hasValue(value) || (typeof value === 'string' && value.trim() === '')) {
        return intl.formatMessage({ id: 'valideringsfeil.inputfelt.required' }, { inputFeltLabel: label });
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
