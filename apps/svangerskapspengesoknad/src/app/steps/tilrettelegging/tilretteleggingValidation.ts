import { SkjemaelementFeil, formatDate, intlUtils, validateTextInputField } from '@navikt/fp-common';
import { dagenFør, tiMånederSidenDato } from '@navikt/fp-utils';
import {
    Arbeidsforholdstype,
    Stilling,
    TilOgMedDatoType,
    TilretteleggingstypeOptions,
} from 'app/types/Tilrettelegging';
import { getTotalStillingsprosentPåSkjæringstidspunktet } from 'app/utils/arbeidsforholdUtils';
import { getFloatFromString } from 'app/utils/numberUtils';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH, getSlutteTekst, hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

const validerStillingsprosentInput = (intl: IntlShape, value: string) => {
    if (!hasValue(value) || value.trim() === '') {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.required');
    }
    const stillingsprosent = getFloatFromString(value);

    if (stillingsprosent === undefined) {
        return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreEtTall');
    }

    return undefined;
};

export const validateStillingsprosentEnDelvisPeriode =
    (intl: IntlShape, fom: string | undefined, stillinger: Stilling[]) => (value: string) => {
        const initValidering = validerStillingsprosentInput(intl, value);
        if (initValidering) {
            return initValidering;
        }

        const stillingsprosent = getFloatFromString(value)!;
        if (stillingsprosent <= 0) {
            return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreStørreEnn0');
        }
        const opprinneligStillingsProsent = getTotalStillingsprosentPåSkjæringstidspunktet(stillinger, fom);
        if (opprinneligStillingsProsent === 0 && stillingsprosent >= 100) {
            return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreMindreEnn100Prosent', {
                prosent: opprinneligStillingsProsent,
            });
        }
        if (opprinneligStillingsProsent > 0 && stillingsprosent >= opprinneligStillingsProsent) {
            return intlUtils(intl, 'valideringsfeil.stillingsprosent.måVæreMindreEnnOpprinneligStillingsprosent', {
                prosent: opprinneligStillingsProsent,
            });
        }
        return undefined;
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
        sisteDagForSvangerskapspenger: string,
        tilretteleggingstype: TilretteleggingstypeOptions,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
        kanHaSVPFremTilTreUkerFørTermin: boolean,
    ) =>
    (value: string) => {
        const erDelvis = tilretteleggingstype === TilretteleggingstypeOptions.DELVIS;
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
            if (kanHaSVPFremTilTreUkerFørTermin) {
                return erDelvis
                    ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.delvis')
                    : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.ingen');
            }
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterFødsel.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminFom.etterFødsel.ingen');
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
        sisteDagForSvangerskapspenger: string,
        fom: string | undefined,
        type: TilretteleggingstypeOptions,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
        kanHaSVPFremTilTreUkerFørTermin: boolean,
    ) =>
    (value: string) => {
        const erDelvis = type === TilretteleggingstypeOptions.DELVIS;
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
            if (kanHaSVPFremTilTreUkerFørTermin) {
                return erDelvis
                    ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.delvis')
                    : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.ingen');
            }
            return erDelvis
                ? intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.etterFødsel.delvis')
                : intlUtils(intl, 'valideringsfeil.sammePeriodeFremTilTerminTom.etterFødsel.ingen');
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
        sisteDagForSvangerskapspenger: string,
        termindato: string,
        arbeidNavn: string,
        startDatoArbeid: string,
        sluttDatoArbeid: string | undefined,
        kanHaSvpFremTilTreUkerFørTermin: boolean,
        erFrilansTilrettelegging: boolean,
    ) =>
    (fom: string): SkjemaelementFeil => {
        if (dayjs(fom).isBefore(tiMånederSidenDato(termindato), 'd')) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.tiMndSidenTermin');
        }
        if (dayjs(fom).isAfter(dagenFør(sisteDagForSvangerskapspenger), 'd')) {
            return kanHaSvpFremTilTreUkerFørTermin
                ? intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørTermin')
                : intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.måVæreFørFødsel');
        }

        if (dayjs(fom).isBefore(dayjs(startDatoArbeid), 'd')) {
            const navnTekst = erFrilansTilrettelegging ? intlUtils(intl, 'somFrilanser') : `i ${arbeidNavn}`;
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.førStartDatoArbeid', {
                dato: formatDate(startDatoArbeid),
                navnTekst,
            });
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

export const validerTilretteleggingTomType =
    (
        intl: IntlShape,
        tilretteleggingType: TilretteleggingstypeOptions,
        behovForTilretteleggingFom: string | undefined,
        sisteDagForSvangerskapspenger: string,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
        kanHaSVPFremTilTreUkerFørTermin: boolean,
    ) =>
    (value: string | number): SkjemaelementFeil => {
        const erDelvis = tilretteleggingType === TilretteleggingstypeOptions.DELVIS;
        if (!hasValue(value)) {
            if (erDelvis) {
                return kanHaSVPFremTilTreUkerFørTermin
                    ? intlUtils(intl, 'valideringsfeil.tomType.påkrevd.delvis.tilTermin')
                    : intlUtils(intl, 'valideringsfeil.tomType.påkrevd.delvis.tilFødsel');
            } else {
                return kanHaSVPFremTilTreUkerFørTermin
                    ? intlUtils(intl, 'valideringsfeil.tomType.påkrevd.ingen.tilTermin')
                    : intlUtils(intl, 'valideringsfeil.tomType.påkrevd.ingen.tilFødsel');
            }
        }
        if (
            sluttDatoArbeid &&
            hasValue(behovForTilretteleggingFom) &&
            value === TilOgMedDatoType.SISTE_DAG_MED_SVP &&
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
