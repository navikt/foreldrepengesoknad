import { isISODateString } from '@navikt/ds-datepicker';
import { SkjemaelementFeil, formatDate, intlUtils, validateTextInputField } from '@navikt/fp-common';
import {
    Arbeidsforholdstype,
    PeriodeMedVariasjon,
    TilOgMedDatoType,
    TilretteleggingstypeOptions,
} from 'app/types/Tilrettelegging';
import { dagenFør, tiMånederSidenDato } from 'app/utils/dateUtils';
import { getFloatFromString } from 'app/utils/numberUtils';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH, getSlutteTekst, hasValue } from 'app/utils/validationUtils';
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
export const validateTilretteleggingstiltak = (intl: IntlShape, label: string) => (value: string) => {
    if (!hasValue(value) || value.trim() === '') {
        return intlUtils(intl, 'valideringsfeil.tilretteleggingstiltak.påkrevd');
    }

    if (value.length > TEXT_INPUT_MAX_LENGTH) {
        return intlUtils(intl, 'valideringsfeil.tilretteleggingstiltak.forLang');
    }

    if (value.length < TEXT_INPUT_MIN_LENGTH) {
        return intlUtils(intl, 'valideringsfeil.tilretteleggingstiltak.forKort');
    }

    return validateTextInputField(value, label, intl);
};

export const validateSammePeriodeFremTilTerminFom =
    (
        intl: IntlShape,
        behovForTilretteleggingFom: string | undefined,
        sisteDagForSvangerskapspenger: Date,
        fødselsdato: string | undefined,
        tilretteleggingstype: TilretteleggingstypeOptions,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
    ) =>
    (value: string) => {
        const erDelvis = tilretteleggingstype === TilretteleggingstypeOptions.DELVIS;
        if (!hasValue(value)) {
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.ingen');
        }
        if (hasValue(value) && !isISODateString(value)) {
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.ingen');
        }

        if (
            hasValue(value) &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(value).isBefore(dayjs(behovForTilretteleggingFom), 'd')
        ) {
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.førBehovForTilretteleggingFom.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.førBehovForTilretteleggingFom.ingen');
        }

        if (hasValue(value) && dayjs(value).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
            if (fødselsdato) {
                return erDelvis
                    ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørFødsel.delvis')
                    : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørFødsel.ingen');
            }
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.ingen');
        }
        if (
            sluttDatoArbeid &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(behovForTilretteleggingFom).isSameOrBefore(dayjs(sluttDatoArbeid), 'd') &&
            dayjs(value).isAfter(dayjs(sluttDatoArbeid), 'd')
        ) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterSluttDatoArbeid.delvis', {
                      dato: formatDate(sluttDatoArbeid),
                      navn: arbeidNavn,
                      slutteTekst,
                  })
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterSluttDatoArbeid.ingen', {
                      dato: formatDate(sluttDatoArbeid),
                      navn: arbeidNavn,
                      slutteTekst,
                  });
        }
        return undefined;
    };

export const validateSammePeriodeFremTilTerminTilbakeIJobbDato =
    (
        intl: IntlShape,
        behovForTilretteleggingFom: string | undefined,
        sisteDagForSvangerskapspenger: Date,
        fødselsdato: string | undefined,
        fom: string | undefined,
        type: TilretteleggingstypeOptions,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
    ) =>
    (value: string) => {
        const erDelvis = type === TilretteleggingstypeOptions.DELVIS;
        if (!hasValue(value)) {
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.påkrevd.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.påkrevd.ingen');
        }
        if (hasValue(value) && !isISODateString(value)) {
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.ingen');
        }

        if (
            hasValue(value) &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(value).isBefore(dayjs(behovForTilretteleggingFom), 'd')
        ) {
            return intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.førBehovForTilretteleggingFom');
        }
        if (hasValue(fom) && dayjs(value).isBefore(dayjs(fom), 'd')) {
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.førFomDato.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.førFomDato.ingen');
        }
        if (hasValue(fom) && dayjs(value).isSame(dayjs(fom), 'd')) {
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.sammeSomFomDato.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.sammeSomFomDato.ingen');
        }

        if (hasValue(value) && dayjs(value).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
            if (fødselsdato) {
                return erDelvis
                    ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørFødsel.delvis')
                    : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørFødsel.ingen');
            }
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.ingen');
        }
        if (
            sluttDatoArbeid &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(behovForTilretteleggingFom).isSameOrBefore(dayjs(sluttDatoArbeid), 'd') &&
            dayjs(value).isAfter(dayjs(sluttDatoArbeid), 'd')
        ) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.etterSluttDatoArbeid', {
                dato: formatDate(sluttDatoArbeid),
                navn: arbeidNavn,
                slutteTekst,
            });
        }
        return undefined;
    };

export const validateBehovForTilretteleggingFom =
    (
        intl: IntlShape,
        sisteDagForSvangerskapspenger: Date,
        termindato: Date,
        erBarnetFødt: boolean,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
    ) =>
    (fom: string): SkjemaelementFeil => {
        if (!hasValue(fom)) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.mangler');
        }
        if (!isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.gyldigDato');
        }

        if (dayjs(fom).isBefore(tiMånederSidenDato(termindato), 'd')) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.tiMndSidenTermin');
        }
        if (dayjs(fom).isAfter(dagenFør(sisteDagForSvangerskapspenger), 'd')) {
            return erBarnetFødt
                ? intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørTermin');
        }
        if (dayjs(fom).isAfter(dagenFør(termindato), 'd')) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.etterTermin');
        }
        if (sluttDatoArbeid && dayjs(fom).isAfter(dayjs(sluttDatoArbeid), 'd')) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.etterSluttDatoArbeid', {
                dato: formatDate(sluttDatoArbeid),
                navn: arbeidNavn,
                slutteTekst,
            });
        }
        return undefined;
    };

export const validateTilrettelagtArbeidType =
    (intl: IntlShape) =>
    (type: TilretteleggingstypeOptions): SkjemaelementFeil => {
        if (!hasValue(type)) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidType.mangler');
        }
        return undefined;
    };

export const validerTilretteleggingTomType =
    (
        intl: IntlShape,
        tilretteleggingType: TilretteleggingstypeOptions,
        behovForTilretteleggingFom: string | undefined,
        sisteDagForSvangerskapspenger: Date,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
    ) =>
    (value: TilOgMedDatoType): SkjemaelementFeil => {
        const erDelvis = tilretteleggingType === TilretteleggingstypeOptions.DELVIS;
        if (!hasValue(value)) {
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.tomType.påkrevd.delvis')
                : intlUtils(intl, 'valideringsfeil.tomType.påkrevd.ingen');
        }
        if (
            sluttDatoArbeid &&
            hasValue(behovForTilretteleggingFom) &&
            value === TilOgMedDatoType.TRE_UKER_FØR_TERMIN &&
            dayjs(behovForTilretteleggingFom).isSameOrBefore(dayjs(sluttDatoArbeid), 'd') &&
            dayjs(sisteDagForSvangerskapspenger).isAfter(dayjs(sluttDatoArbeid), 'd')
        ) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.tomType.etterSluttDatoArbeid.delvis', {
                      slutteTekst,
                      navn: arbeidNavn,
                  })
                : intlUtils(intl, 'valideringsfeil.tomType.etterSluttDatoArbeid.ingen', {
                      slutteTekst,
                      navn: arbeidNavn,
                  });
        }
        return undefined;
    };

export const validateTilretteleggingPeriodetype =
    (intl: IntlShape) =>
    (type: TilretteleggingstypeOptions): SkjemaelementFeil => {
        if (!hasValue(type)) {
            return intlUtils(intl, 'valideringsfeil.tilretteleggingPeriodeType.mangler');
        }
        return undefined;
    };

const finnFeilmeldingForPåkrevd = (intl: IntlShape, type: Arbeidsforholdstype) => {
    if (type === Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'valideringsfeil.risikofaktorer.frilanser.påkrevd');
    }
    if (type === Arbeidsforholdstype.SELVSTENDIG) {
        return intlUtils(intl, 'valideringsfeil.risikofaktorer.selvstendig.påkrevd');
    }
    if (type === Arbeidsforholdstype.VIRKSOMHET) {
        return intlUtils(intl, 'valideringsfeil.risikofaktorer.virksomhet.påkrevd');
    }
    throw Error('Ingen påkrevd-tekst for type: ' + type);
};

const finnFeilmeldingForOverMakslengde = (intl: IntlShape, type: Arbeidsforholdstype) => {
    if (type === Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'valideringsfeil.risikofaktorer.frilanser.forLang');
    }
    if (type === Arbeidsforholdstype.SELVSTENDIG) {
        return intlUtils(intl, 'valideringsfeil.risikofaktorer.selvstendig.forLang');
    }
    throw Error('Ingen makslengde-tekst for type: ' + type);
};

const finnFeilmeldingForUnderMinLengde = (intl: IntlShape, type: Arbeidsforholdstype) => {
    if (type === Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'valideringsfeil.risikofaktorer.frilanser.forKort');
    }
    if (type === Arbeidsforholdstype.SELVSTENDIG) {
        return intlUtils(intl, 'valideringsfeil.risikofaktorer.selvstendig.forKort');
    }
    throw Error('Ingen tekst for type: ' + type);
};

export const validateRisikofaktorer =
    (intl: IntlShape, label: string, type: Arbeidsforholdstype) => (value: string) => {
        if (!hasValue(value) || value.trim() === '') {
            return finnFeilmeldingForPåkrevd(intl, type);
        }

        if (value.length > TEXT_INPUT_MAX_LENGTH) {
            return finnFeilmeldingForOverMakslengde(intl, type);
        }

        if (value.length < TEXT_INPUT_MIN_LENGTH) {
            return finnFeilmeldingForUnderMinLengde(intl, type);
        }

        return validateTextInputField(value, label, intl);
    };
