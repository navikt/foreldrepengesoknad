import { hasValue, intlUtils } from '@navikt/fp-common';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik/lib';
import { SkjemaelementFeil } from 'app/types/SkjemaelementFeil';
import { isDateABeforeDateB, isDateInTheFuture } from 'app/utils/dateUtils';
import { erGyldigNorskOrgnummer } from 'app/utils/numberUtils';
import { validateTextInputField } from 'app/utils/validationUtil';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';

export const validateEgenNæringFom =
    (intl: IntlShape, tom: string) =>
    (fom: string): SkjemaelementFeil => {
        if (!hasValue(fom)) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.påkrevd');
        }

        if (!isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
        }

        if (isDateInTheFuture(fom)) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
        }

        if (isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.førTilDato');
        }

        return undefined;
    };

export const validateEgenNæringTom =
    (intl: IntlShape, fom: string) =>
    (tom: string): SkjemaelementFeil => {
        if (!hasValue(tom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.påkrevd');
        }

        if (!isISODateString(tom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
        }

        if (isDateInTheFuture(tom)) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
        }

        if (isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.førTilDato');
        }

        return undefined;
    };

export const validateEgenNæringOrgnr =
    (intl: IntlShape) =>
    (orgnr: string): SkjemaelementFeil => {
        if (!erGyldigNorskOrgnummer(orgnr)) {
            return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.orgnr.ugyldigFormat');
        }

        return undefined;
    };

export const validateEgenNæringForklaringTilEndring = (intl: IntlShape, label: string) => (forklaring: string) => {
    if (forklaring.length < 25) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.forklaringTilEndring.forKort');
    }

    if (forklaring.length > 1000) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.forklaringTilEndring.forLang');
    }

    return validateTextInputField(forklaring, label, intl);
};

export const validateEgenNæringEndringAvInntektsDato = (intl: IntlShape) => (dato: string) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.påkrevd');
    }

    if (!isISODateString(dato)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (isDateInTheFuture(dato)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
    }

    return undefined;
};

export const validateEgenNæringYrkesAktivDatoDato = (intl: IntlShape) => (dato: string) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.påkrevd');
    }

    if (!isISODateString(dato)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (isDateInTheFuture(dato)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
    }

    return undefined;
};

export const validateNumber = (intl: IntlShape, errorKey: string) => (value: string) => {
    const valueNumber = getNumberFromNumberInputValue(value);

    if (!valueNumber || Math.round(valueNumber) !== valueNumber) {
        return intlUtils(intl, errorKey);
    }
};
