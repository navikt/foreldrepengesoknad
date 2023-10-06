import { isISODateString } from '@navikt/ds-datepicker';
import { intlUtils } from '@navikt/fp-common';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { getFloatFromString } from 'app/utils/numberUtils';
import { hasValue, validateTextAreaInput } from 'app/utils/validationUtils';
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

export const validateTilretteleggingstiltak =
    (intl: IntlShape, label: string, fieldName: string) => (value: string) => {
        return validateTextAreaInput(value, intl, label, fieldName);
    };

export const validateSammePeriodeFremTilTerminFom =
    (
        intl: IntlShape,
        behovForTilretteleggingFom: string | undefined,
        treUkerFørFødselEllerTermin: Date,
        fødselsdato: string | undefined,
        tom: string | undefined,
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

        if (hasValue(tom) && dayjs(value).isAfter(dayjs(tom), 'd')) {
            return intlUtils(intl, 'valideringsfeil.enPeriodeMedTilretteleggingFom.etterTom');
        }

        if (hasValue(value) && dayjs(value).isSameOrAfter(dayjs(treUkerFørFødselEllerTermin), 'd')) {
            return fødselsdato
                ? intlUtils(intl, 'valideringsfeil.periode.fom.etterTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.periode.fom.etterTreUkerFørTermin');
        }
        return undefined;
    };

export const validateSammePeriodeFremTilTerminTom =
    (
        intl: IntlShape,
        behovForTilretteleggingFom: string | undefined,
        treUkerFørFødselEllerTermin: Date,
        fødselsdato: string | undefined,
        fom: string | undefined,
    ) =>
    (value: string) => {
        if (!hasValue(value)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.påkrevd');
        }
        if (hasValue(value) && !isISODateString(value)) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.gyldigDato');
        }

        if (
            hasValue(value) &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(value).isBefore(dayjs(behovForTilretteleggingFom), 'd')
        ) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.førBehovForTilretteleggingFom');
        }
        if (hasValue(fom) && dayjs(value).isBefore(dayjs(fom), 'd')) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.etterTilDato');
        }

        if (hasValue(value) && dayjs(value).isSameOrAfter(dayjs(treUkerFørFødselEllerTermin), 'd')) {
            return fødselsdato
                ? intlUtils(intl, 'valideringsfeil.periode.tom.etterTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.periode.tom.etterTreUkerFørTermin');
        }
        return undefined;
    };

export const validateRisikofaktorer =
    (intl: IntlShape, label: string, type: Arbeidsforholdstype, fieldName: string) => (risikoFaktorer: string) => {
        return validateTextAreaInput(risikoFaktorer, intl, label, `${fieldName}.${type}`);
    };
