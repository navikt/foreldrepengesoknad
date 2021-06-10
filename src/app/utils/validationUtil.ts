import { intlUtils } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { isFødselsnummerFormatValid, isSixteenOrOlder } from './validation/fødselsnummer';

export type FormikFieldErrorRender = (errorMessage: string, fieldName: string) => string;

export const getFieldErrorRenderer = (): FormikFieldErrorRender => (errorMessage: string): string => {
    return errorMessage;
};

export const validateFødselsnummer = (intl: IntlShape, søkersFødselsnummer: string, erUtenlandskFnr?: boolean) => (
    fnr: string
): string | undefined => {
    const validFnrResult = isFødselsnummerFormatValid(fnr);

    if (erUtenlandskFnr) {
        if (fnr === undefined || fnr === '') {
            return intlUtils(intl, 'valideringsfeil.fødselsnummer.required');
        }

        return undefined;
    }

    if (fnr === søkersFødselsnummer) {
        return intlUtils(intl, 'valideringsfeil.fødselsnummer.ugyldigEgetFødselsnummer');
    }

    if (!erUtenlandskFnr && !isSixteenOrOlder(fnr, validFnrResult) && validFnrResult === 'F') {
        return intlUtils(intl, 'valideringsfeil.fødselsnummer.underSeksten');
    }

    return validFnrResult === 'F' || validFnrResult === 'D'
        ? undefined
        : intlUtils(intl, 'valideringsfeil.fødselsnummer.ugyldigFødselsnummer');
};
