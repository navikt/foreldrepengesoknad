import { isISODateString } from '@navikt/ds-datepicker';
import { intlUtils, validateTextInputField } from '@navikt/fp-common';
import { getFloatFromString } from 'app/utils/numberUtils';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH, hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validateStillingsprosent = (intl: IntlShape) => (value: string) => {
    const stillingsprosent = getFloatFromString(value);

    if (!hasValue(value) || value.trim() === '') {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.required');
    }

    if (stillingsprosent === undefined) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreEtTall');
    }

    if (stillingsprosent <= 0) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreStørreEnn0');
    }

    if (stillingsprosent >= 100) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreMindreEnn100');
    }

    return undefined;
};

export const validateTilretteleggingstiltak = (intl: IntlShape, label: string) => (value: string) => {
    if (!hasValue(value) || value.trim() === '') {
        return intlUtils(intl, `valideringsfeil.tilretteleggingstiltak.påkrevd`);
    }

    if (value.length > TEXT_INPUT_MAX_LENGTH) {
        return intlUtils(intl, `valideringsfeil.tilretteleggingstiltak.forLang`);
    }

    if (value.length < TEXT_INPUT_MIN_LENGTH) {
        return intlUtils(intl, `valideringsfeil.tilretteleggingstiltak.forKort`);
    }

    return validateTextInputField(value, label, intl);

    return undefined;
};

export const validateSammePeriodeFremTilTerminFom =
    (
        intl: IntlShape,
        behovForTilretteleggingFom: string | undefined,
        treUkerFørFødselEllerTermin: Date,
        fødselsdato: string | undefined,
    ) =>
    (value: string) => {
        if (!hasValue(value)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.påkrevd');
        }
        if (hasValue(value) && !isISODateString(value)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.gyldigDato');
        }

        if (
            hasValue(value) &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(value).isBefore(dayjs(behovForTilretteleggingFom), 'd')
        ) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.førBehovForTilretteleggingFom');
        }

        if (hasValue(value) && dayjs(value).isSameOrAfter(dayjs(treUkerFørFødselEllerTermin), 'd')) {
            return fødselsdato
                ? intlUtils(intl, 'valideringsfeil.periode.fom.etterTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.periode.fom.etterTreUkerFørTermin');
        }
        return undefined;
    };
