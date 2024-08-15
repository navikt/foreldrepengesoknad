import { IntlShape } from 'react-intl';

import { erGyldigNorskOrgnummer, hasValue, isDateInTheFuture, validateTextInputField } from '@navikt/fp-common';
import { getNumberFromNumberInputValue, isISODateString } from '@navikt/fp-utils';

import { SkjemaelementFeil } from 'app/types/SkjemaelementFeil';
import { isDateABeforeDateB } from 'app/utils/dateUtils';

export const validateEgenNæringFom =
    (intl: IntlShape, tom: string) =>
    (fom: string): SkjemaelementFeil => {
        if (!hasValue(fom)) {
            return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.påkrevd' });
        }

        if (!isISODateString(fom)) {
            return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.gyldigDato' });
        }

        if (isDateInTheFuture(fom)) {
            return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' });
        }

        if (isDateABeforeDateB(tom, fom)) {
            return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.førTilDato' });
        }

        return undefined;
    };

export const validateEgenNæringTom =
    (intl: IntlShape, fom: string) =>
    (tom: string): SkjemaelementFeil => {
        if (!hasValue(tom)) {
            return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.påkrevd' });
        }

        if (!isISODateString(tom)) {
            return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' });
        }

        if (isDateInTheFuture(tom)) {
            return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' });
        }

        if (isDateABeforeDateB(tom, fom)) {
            return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.førTilDato' });
        }

        return undefined;
    };

export const validateEgenNæringOrgnr =
    (intl: IntlShape) =>
    (orgnr: string): SkjemaelementFeil => {
        if (!erGyldigNorskOrgnummer(orgnr)) {
            return intl.formatMessage({ id: 'valideringsfeil.inntektsinformasjon.orgnr.ugyldigFormat' });
        }

        return undefined;
    };

export const validateEgenNæringForklaringTilEndring = (intl: IntlShape, label: string) => (forklaring: string) => {
    if (forklaring.length < 25) {
        return intl.formatMessage({ id: 'valideringsfeil.inntektsinformasjon.forklaringTilEndring.forKort' });
    }

    if (forklaring.length > 1000) {
        return intl.formatMessage({ id: 'valideringsfeil.inntektsinformasjon.forklaringTilEndring.forLang' });
    }

    return validateTextInputField(forklaring, label, intl);
};

export const validateEgenNæringEndringAvInntektsDato = (intl: IntlShape) => (dato: string) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.påkrevd' });
    }

    if (!isISODateString(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' });
    }

    if (isDateInTheFuture(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' });
    }

    return undefined;
};

export const validateEgenNæringYrkesAktivDatoDato = (intl: IntlShape) => (dato: string) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.påkrevd' });
    }

    if (!isISODateString(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' });
    }

    if (isDateInTheFuture(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' });
    }

    return undefined;
};

export const validateNumber = (intl: IntlShape, errorKey: string) => (value: string) => {
    const valueNumber = getNumberFromNumberInputValue(value);

    if (!valueNumber || Math.round(valueNumber) !== valueNumber) {
        return intl.formatMessage({ id: errorKey });
    }

    return undefined;
};
