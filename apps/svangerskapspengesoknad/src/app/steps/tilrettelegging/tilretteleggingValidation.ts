import { isISODateString } from '@navikt/ds-datepicker';
import { formatDate, intlUtils } from '@navikt/fp-common';
import { Arbeidsforholdstype, PeriodeMedVariasjon, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { getFloatFromString } from 'app/utils/numberUtils';
import { hasValue, validateTextAreaInput } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validerStillingsprosentInput = (
    intl: IntlShape,
    value: string,
    opprinneligStillingsProsent: number,
    lovÅOppgiOpprinneligStillingsprosent: boolean,
    lovÅOppgiNullStillingsprosent: boolean,
) => {
    const stillingsprosent = getFloatFromString(value);

    if (!hasValue(value) || value.trim() === '') {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.required');
    }

    if (stillingsprosent === undefined) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreEtTall');
    }

    if (!lovÅOppgiNullStillingsprosent && stillingsprosent <= 0) {
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
        allePerioder: PeriodeMedVariasjon[] | undefined,
    ) =>
    (value: string) => {
        const valideringsFeil = validerStillingsprosentInput(intl, value, opprinneligStillingsProsent, true, true);
        if (valideringsFeil) {
            return valideringsFeil;
        }
        if (
            allePerioder &&
            allePerioder?.every(
                (periode) =>
                    hasValue(periode.stillingsprosent) &&
                    parseInt(periode.stillingsprosent!, 10) === opprinneligStillingsProsent,
            )
        ) {
            return intlUtils(intl, 'valideringsfeil.periode.stillingsprosent.kunFullTilrettelegging', {
                prosent: opprinneligStillingsProsent,
            });
        }
        if (måSøkeSendeNySøknad && periodeDerTilbakeIFullJobb) {
            return intlUtils(intl, 'valideringsfeil.periode.stillingsprosent.nySøknad', {
                fom: formatDate(periodeDerTilbakeIFullJobb.fom),
            });
        }
        return undefined;
    };

export const validateStillingsprosent = (intl: IntlShape, opprinneligStillingsProsent: number) => (value: string) => {
    return validerStillingsprosentInput(intl, value, opprinneligStillingsProsent, false, false);
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
        tilretteleggingstype: TilretteleggingstypeOptions,
    ) =>
    (value: string) => {
        if (!hasValue(value)) {
            return intlUtils(intl, `valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.${tilretteleggingstype}`);
        }
        if (hasValue(value) && !isISODateString(value)) {
            return intlUtils(intl, `valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.${tilretteleggingstype}`);
        }

        if (
            hasValue(value) &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(value).isBefore(dayjs(behovForTilretteleggingFom), 'd')
        ) {
            return intlUtils(
                intl,
                `valideringsfeil.sammePeriodeFremTilTerminFom.førBehovForTilretteleggingFom.${tilretteleggingstype}`,
            );
        }

        if (hasValue(value) && dayjs(value).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
            return fødselsdato
                ? intlUtils(
                      intl,
                      `valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørFødsel.${tilretteleggingstype}`,
                  )
                : intlUtils(
                      intl,
                      `valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.${tilretteleggingstype}`,
                  );
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
        type: TilretteleggingstypeOptions,
    ) =>
    (value: string) => {
        if (!hasValue(value)) {
            return intlUtils(intl, `valideringsfeil.sammePeriodeFremTilTerminTom.påkrevd.${type}`);
        }
        if (hasValue(value) && !isISODateString(value)) {
            return intlUtils(intl, `valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.${type}`);
        }

        if (
            hasValue(value) &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(value).isBefore(dayjs(behovForTilretteleggingFom), 'd')
        ) {
            return intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.førBehovForTilretteleggingFom');
        }
        if (hasValue(fom) && dayjs(value).isBefore(dayjs(fom), 'd')) {
            return intlUtils(intl, `valideringsfeil.sammePeriodeFremTilTerminTom.førFomDato.${type}`);
        }

        if (hasValue(value) && dayjs(value).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
            return fødselsdato
                ? intlUtils(intl, `valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørFødsel.${type}`)
                : intlUtils(intl, `valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.${type}`);
        }
        return undefined;
    };

export const validateRisikofaktorer =
    (intl: IntlShape, label: string, type: Arbeidsforholdstype, fieldName: string) => (risikoFaktorer: string) => {
        return validateTextAreaInput(risikoFaktorer, intl, label, `${fieldName}.${type}`);
    };
