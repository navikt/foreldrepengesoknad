import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { dagenFør, formatDate, tiMånederSidenDato } from '@navikt/fp-utils';

import {
    Arbeidsforholdstype,
    Stilling,
    TilOgMedDatoType,
    TilretteleggingstypeOptions,
} from 'app/types/Tilrettelegging';
import { getTotalStillingsprosentPåSkjæringstidspunktet } from 'app/utils/arbeidsforholdUtils';
import { getFloatFromString } from 'app/utils/numberUtils';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH, getSlutteTekst, hasValue } from 'app/utils/validationUtils';

const validerStillingsprosentInput = (intl: IntlShape, value: string) => {
    if (!hasValue(value) || value.trim() === '') {
        return intl.formatMessage({ id: 'valideringsfeil.stillingsprosent.required' });
    }
    const stillingsprosent = getFloatFromString(value);

    if (stillingsprosent === undefined) {
        return intl.formatMessage({ id: 'valideringsfeil.stillingsprosent.måVæreEtTall' });
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
            return intl.formatMessage({ id: 'valideringsfeil.stillingsprosent.måVæreStørreEnn0' });
        }
        const opprinneligStillingsProsent = getTotalStillingsprosentPåSkjæringstidspunktet(stillinger, fom);
        if (opprinneligStillingsProsent === 0 && stillingsprosent >= 100) {
            return intl.formatMessage(
                { id: 'valideringsfeil.stillingsprosent.måVæreMindreEnn100Prosent' },
                {
                    prosent: opprinneligStillingsProsent,
                },
            );
        }
        if (opprinneligStillingsProsent > 0 && stillingsprosent >= opprinneligStillingsProsent) {
            return intl.formatMessage(
                { id: 'valideringsfeil.stillingsprosent.måVæreMindreEnnOpprinneligStillingsprosent' },
                {
                    prosent: opprinneligStillingsProsent,
                },
            );
        }
        return undefined;
    };
export const validateTilretteleggingstiltak = (intl: IntlShape) => (value: string) => {
    if (!hasValue(value) || value.trim() === '') {
        return intl.formatMessage({ id: 'valideringsfeil.tilretteleggingstiltak.påkrevd' });
    }

    if (value.length > TEXT_INPUT_MAX_LENGTH) {
        return intl.formatMessage({ id: 'valideringsfeil.tilretteleggingstiltak.forLang' });
    }

    if (value.length < TEXT_INPUT_MIN_LENGTH) {
        return intl.formatMessage({ id: 'valideringsfeil.tilretteleggingstiltak.forKort' });
    }

    return null;
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
                ? intl.formatMessage({
                      id: 'valideringsfeil.sammePeriodeFremTilTerminFom.førBehovForTilretteleggingFom.delvis',
                  })
                : intl.formatMessage({
                      id: 'valideringsfeil.sammePeriodeFremTilTerminFom.førBehovForTilretteleggingFom.ingen',
                  });
        }

        if (hasValue(value) && dayjs(value).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
            if (kanHaSVPFremTilTreUkerFørTermin) {
                return erDelvis
                    ? intl.formatMessage({
                          id: 'valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.delvis',
                      })
                    : intl.formatMessage({
                          id: 'valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.ingen',
                      });
            }
            return erDelvis
                ? intl.formatMessage({ id: 'valideringsfeil.sammePeriodeFremTilTerminFom.etterFødsel.delvis' })
                : intl.formatMessage({ id: 'valideringsfeil.sammePeriodeFremTilTerminFom.etterFødsel.ingen' });
        }
        if (
            sluttDatoArbeid &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(behovForTilretteleggingFom).isSameOrBefore(dayjs(sluttDatoArbeid), 'd') &&
            dayjs(value).isAfter(dayjs(sluttDatoArbeid), 'd')
        ) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return erDelvis
                ? intl.formatMessage(
                      { id: 'valideringsfeil.sammePeriodeFremTilTerminFom.etterSluttDatoArbeid.delvis' },
                      {
                          dato: formatDate(sluttDatoArbeid),
                          navn: arbeidNavn,
                          slutteTekst,
                      },
                  )
                : intl.formatMessage(
                      { id: 'valideringsfeil.sammePeriodeFremTilTerminFom.etterSluttDatoArbeid.ingen' },
                      {
                          dato: formatDate(sluttDatoArbeid),
                          navn: arbeidNavn,
                          slutteTekst,
                      },
                  );
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
            return intl.formatMessage({
                id: 'valideringsfeil.sammePeriodeFremTilTerminTom.førBehovForTilretteleggingFom',
            });
        }
        if (hasValue(fom) && dayjs(value).isBefore(dayjs(fom), 'd')) {
            return erDelvis
                ? intl.formatMessage({ id: 'valideringsfeil.sammePeriodeFremTilTerminTom.førFomDato.delvis' })
                : intl.formatMessage({ id: 'valideringsfeil.sammePeriodeFremTilTerminTom.førFomDato.ingen' });
        }
        if (hasValue(fom) && dayjs(value).isSame(dayjs(fom), 'd')) {
            return erDelvis
                ? intl.formatMessage({ id: 'valideringsfeil.sammePeriodeFremTilTerminTom.sammeSomFomDato.delvis' })
                : intl.formatMessage({ id: 'valideringsfeil.sammePeriodeFremTilTerminTom.sammeSomFomDato.ingen' });
        }

        if (hasValue(value) && dayjs(value).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
            if (kanHaSVPFremTilTreUkerFørTermin) {
                return erDelvis
                    ? intl.formatMessage({
                          id: 'valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.delvis',
                      })
                    : intl.formatMessage({
                          id: 'valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.ingen',
                      });
            }
            return erDelvis
                ? intl.formatMessage({ id: 'valideringsfeil.sammePeriodeFremTilTerminTom.etterFødsel.delvis' })
                : intl.formatMessage({ id: 'valideringsfeil.sammePeriodeFremTilTerminTom.etterFødsel.ingen' });
        }
        if (
            sluttDatoArbeid &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(behovForTilretteleggingFom).isSameOrBefore(dayjs(sluttDatoArbeid), 'd') &&
            dayjs(value).isAfter(dayjs(sluttDatoArbeid), 'd')
        ) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intl.formatMessage(
                { id: 'valideringsfeil.sammePeriodeFremTilTerminTom.etterSluttDatoArbeid' },
                {
                    dato: formatDate(sluttDatoArbeid),
                    navn: arbeidNavn,
                    slutteTekst,
                },
            );
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
    (fom: string): string | undefined => {
        if (dayjs(fom).isBefore(tiMånederSidenDato(termindato), 'd')) {
            return intl.formatMessage({ id: 'valideringsfeil.tilrettelagtArbeidFom.tiMndSidenTermin' });
        }
        if (dayjs(fom).isAfter(dagenFør(sisteDagForSvangerskapspenger), 'd')) {
            return kanHaSvpFremTilTreUkerFørTermin
                ? intl.formatMessage({ id: 'valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørTermin' })
                : intl.formatMessage({ id: 'valideringsfeil.tilrettelagtArbeidFom.måVæreFørFødsel' });
        }

        if (dayjs(fom).isBefore(dayjs(startDatoArbeid), 'd')) {
            const navnTekst = erFrilansTilrettelegging ? intl.formatMessage({ id: 'somFrilanser' }) : `i ${arbeidNavn}`;
            return intl.formatMessage(
                { id: 'valideringsfeil.tilrettelagtArbeidFom.førStartDatoArbeid' },
                {
                    dato: formatDate(startDatoArbeid),
                    navnTekst,
                },
            );
        }

        if (sluttDatoArbeid && dayjs(fom).isAfter(dayjs(sluttDatoArbeid), 'd')) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intl.formatMessage(
                { id: 'valideringsfeil.tilrettelagtArbeidFom.etterSluttDatoArbeid' },
                {
                    dato: formatDate(sluttDatoArbeid),
                    navn: arbeidNavn,
                    slutteTekst,
                },
            );
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
    (value: string | number): string | undefined => {
        const erDelvis = tilretteleggingType === TilretteleggingstypeOptions.DELVIS;
        if (!hasValue(value)) {
            if (erDelvis) {
                return kanHaSVPFremTilTreUkerFørTermin
                    ? intl.formatMessage({ id: 'valideringsfeil.tomType.påkrevd.delvis.tilTermin' })
                    : intl.formatMessage({ id: 'valideringsfeil.tomType.påkrevd.delvis.tilFødsel' });
            } else {
                return kanHaSVPFremTilTreUkerFørTermin
                    ? intl.formatMessage({ id: 'valideringsfeil.tomType.påkrevd.ingen.tilTermin' })
                    : intl.formatMessage({ id: 'valideringsfeil.tomType.påkrevd.ingen.tilFødsel' });
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
                ? intl.formatMessage(
                      { id: 'valideringsfeil.tomType.etterSluttDatoArbeid.delvis' },
                      {
                          slutteTekst,
                          navn: arbeidNavn,
                      },
                  )
                : intl.formatMessage(
                      { id: 'valideringsfeil.tomType.etterSluttDatoArbeid.ingen' },
                      {
                          slutteTekst,
                          navn: arbeidNavn,
                      },
                  );
        }
        return undefined;
    };

const finnFeilmeldingForPåkrevd = (intl: IntlShape, type: Arbeidsforholdstype) => {
    if (type === Arbeidsforholdstype.FRILANSER) {
        return intl.formatMessage({ id: 'valideringsfeil.risikofaktorer.frilanser.påkrevd' });
    }
    if (type === Arbeidsforholdstype.SELVSTENDIG) {
        return intl.formatMessage({ id: 'valideringsfeil.risikofaktorer.selvstendig.påkrevd' });
    }
    if (type === Arbeidsforholdstype.VIRKSOMHET) {
        return intl.formatMessage({ id: 'valideringsfeil.risikofaktorer.virksomhet.påkrevd' });
    }
    throw Error('Ingen påkrevd-tekst for type: ' + type);
};

const finnFeilmeldingForOverMakslengde = (intl: IntlShape, type: Arbeidsforholdstype) => {
    if (type === Arbeidsforholdstype.FRILANSER) {
        return intl.formatMessage({ id: 'valideringsfeil.risikofaktorer.frilanser.forLang' });
    }
    if (type === Arbeidsforholdstype.SELVSTENDIG) {
        return intl.formatMessage({ id: 'valideringsfeil.risikofaktorer.selvstendig.forLang' });
    }
    throw Error('Ingen makslengde-tekst for type: ' + type);
};

const finnFeilmeldingForUnderMinLengde = (intl: IntlShape, type: Arbeidsforholdstype) => {
    if (type === Arbeidsforholdstype.FRILANSER) {
        return intl.formatMessage({ id: 'valideringsfeil.risikofaktorer.frilanser.forKort' });
    }
    if (type === Arbeidsforholdstype.SELVSTENDIG) {
        return intl.formatMessage({ id: 'valideringsfeil.risikofaktorer.selvstendig.forKort' });
    }
    throw Error('Ingen tekst for type: ' + type);
};

export const validateRisikofaktorer = (intl: IntlShape, type: Arbeidsforholdstype) => (value: string) => {
    if (!hasValue(value) || value.trim() === '') {
        return finnFeilmeldingForPåkrevd(intl, type);
    }

    if (value.length > TEXT_INPUT_MAX_LENGTH) {
        return finnFeilmeldingForOverMakslengde(intl, type);
    }

    if (value.length < TEXT_INPUT_MIN_LENGTH) {
        return finnFeilmeldingForUnderMinLengde(intl, type);
    }

    return null;
};
