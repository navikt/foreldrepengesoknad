import { isISODateString } from '@navikt/ds-datepicker';
import { formatDate, intlUtils } from '@navikt/fp-common';
import { Arbeidsforholdstype, PeriodeMedVariasjon, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { getFloatFromString } from 'app/utils/numberUtils';
import { hasValue, validateTextAreaInput } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validerStillingsprosentInput = (
    intl: IntlShape,
    value: string,
    opprinneligStillingsProsent: number,
    lovÅOppgiOpprinneligStillingsprosent: boolean,
) => {
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

    if (lovÅOppgiOpprinneligStillingsprosent && stillingsprosent > opprinneligStillingsProsent) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreMindreEllerLikOpprinneligStillingsprosent', {
            prosent: opprinneligStillingsProsent,
        });
    }
    if (!lovÅOppgiOpprinneligStillingsprosent && stillingsprosent >= opprinneligStillingsProsent) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreMindreEnnOpprinneligStillingsprosent', {
            prosent: opprinneligStillingsProsent,
        });
    }

    return undefined;
};

export const validateStillingsprosentPerioder =
    (
        intl: IntlShape,
        opprinneligStillingsProsent: number,
        måSøkeSendeNySøknad: boolean,
        periodeDerTilbakeIFullJobb: PeriodeMedVariasjon | undefined,
    ) =>
    (value: string) => {
        const valideringsFeil = validerStillingsprosentInput(intl, value, opprinneligStillingsProsent, true);
        if (valideringsFeil) {
            return valideringsFeil;
        }
        if (måSøkeSendeNySøknad && periodeDerTilbakeIFullJobb) {
            return intlUtils(intl, 'valideringsfeil.perioder.stillingsprosent.nySøknad', {
                fom: formatDate(periodeDerTilbakeIFullJobb.fom),
            });
        }
        return undefined;
    };

export const validateStillingsprosent = (intl: IntlShape, opprinneligStillingsProsent: number) => (value: string) => {
    return validerStillingsprosentInput(intl, value, opprinneligStillingsProsent, false);
};
export const validateTilretteleggingstiltak =
    (intl: IntlShape, label: string, fieldName: string) => (value: string) => {
        return validateTextAreaInput(value, intl, label, fieldName);
    };

export const validateSammePeriodeFremTilTerminFom =
    (
        intl: IntlShape,
        behovForTilretteleggingFom: string | undefined,
        sisteDagForSvangerskapspenger: Date,
        fødselsdato: string | undefined,
        tom: string | undefined,
        tilretteleggingstype: Tilretteleggingstype,
    ) =>
    (value: string) => {
        if (!hasValue(value)) {
            return tilretteleggingstype === Tilretteleggingstype.DELVIS
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.ingen');
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

        if (hasValue(value) && dayjs(value).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
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
        sisteDagForSvangerskapspenger: Date,
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

        if (hasValue(value) && dayjs(value).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
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
