import { isISODateString } from '@navikt/ds-datepicker';
import {
    SkjemaelementFeil,
    containsWhiteSpace,
    intlUtils,
    isDateABeforeDateB,
    isDateInTheFuture,
    validateStringAsNumberInput,
    validateTextInputField,
} from '@navikt/fp-common';
import { erGyldigNorskOrgnummer } from '@navikt/fp-common/src/common/utils/organisasjonUtils';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { isDateAAfterDateB } from '@navikt/fp-utils';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds/lib';
import { date4YearsAgo, femMånederSiden } from 'app/utils/dateUtils';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH, hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validateEgenNæringFom =
    (intl: IntlShape, tom: string) =>
    (fom: string | undefined): SkjemaelementFeil => {
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
    (tom: string | undefined): SkjemaelementFeil => {
        if (!hasValue(tom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.påkrevd');
        }
        if (!isISODateString(tom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
        }

        if (isDateAAfterDateB(tom, dayjs().add(9, 'month'))) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.erIFremtiden');
        }

        if (isDateABeforeDateB(tom, femMånederSiden().format(ISO_DATE_FORMAT))) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.egenNæring.merEnn5MånederSiden');
        }

        if (isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
        }

        return undefined;
    };

export const validateEgenNæringOrgnr =
    (intl: IntlShape, erValgfri: boolean) =>
    (orgnr: string | undefined): SkjemaelementFeil => {
        const trimmedOrgNr = (orgnr || '').trim();

        if (!erValgfri && !hasValue(trimmedOrgNr)) {
            return intlUtils(intl, 'valideringsfeil.egenNæringOrgnr.påkrevd');
        }
        if (trimmedOrgNr.length > 0 && containsWhiteSpace(trimmedOrgNr)) {
            return intlUtils(intl, 'valideringsfeil.egenNæringOrgnr.inneholderMellomrom');
        }
        if (trimmedOrgNr.length > 0 && !erGyldigNorskOrgnummer(trimmedOrgNr)) {
            return intlUtils(intl, 'valideringsfeil.egenNæringOrgnr.ugyldigFormat');
        }

        return undefined;
    };

export const validateEgenNæringYrkesAktivDatoDato = (intl: IntlShape) => (dato: string | undefined) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.yrkesaktiv.påkrevd');
    }

    if (!isISODateString(dato)) {
        return intlUtils(intl, 'valideringsfeil.yrkesaktiv.gyldigDato');
    }

    if (isDateInTheFuture(dato)) {
        return intlUtils(intl, 'valideringsfeil.yrkesaktiv.erIFremtiden');
    }

    return undefined;
};

export const validateEgenNæringResultat = (intl: IntlShape) => (value: string | undefined) => {
    if (!hasValue(value)) {
        return intlUtils(intl, 'valideringsfeil.egenNæringInntekt.påkrevd');
    } else {
        if (value!.length > 9) {
            return intlUtils(intl, 'valideringsfeil.næringsinntekt.forLang');
        }
        const valueNumber = getNumberFromNumberInputValue(value);
        if (!valueNumber || Math.round(valueNumber) !== valueNumber) {
            return intlUtils(intl, 'valideringsfeil.næringsinntekt.ugyldigFormat');
        }
        if (valueNumber && valueNumber < 0) {
            return intlUtils(intl, 'valideringsfeil.næringsinntekt.mindreEnnNull');
        }
    }

    return undefined;
};

export const validateEgenNæringVarigEndringDato =
    (intl: IntlShape, fom: string | undefined, tom: string | undefined) =>
    (endringDato: string): SkjemaelementFeil => {
        if (!hasValue(endringDato)) {
            return intlUtils(intl, 'valideringsfeil.varigEndringDato.påkrevd');
        }

        if (!isISODateString(endringDato)) {
            return intlUtils(intl, 'valideringsfeil.varigEndringDato.gyldigDato');
        }

        if (isDateInTheFuture(endringDato)) {
            return intlUtils(intl, 'valideringsfeil.varigEndringDato.erIFremtiden');
        }
        if (isDateABeforeDateB(endringDato, date4YearsAgo.format(ISO_DATE_FORMAT))) {
            return intlUtils(intl, 'valideringsfeil.varigEndringDato.mindreEnn4ÅrSiden');
        }

        if (isDateABeforeDateB(endringDato, fom!)) {
            return intlUtils(intl, 'valideringsfeil.varigEndringDato.førFraDato');
        }
        if (tom && hasValue(tom) && isDateABeforeDateB(tom, endringDato)) {
            return intlUtils(intl, 'valideringsfeil.varigEndringDato.etterTilDato');
        }

        return undefined;
    };

export const validateEgenNæringVarigEndringInntekt =
    (intl: IntlShape) =>
    (value: string | undefined): SkjemaelementFeil => {
        if (!hasValue(value)) {
            return intlUtils(intl, 'valideringsfeil.varigEndringInntekt.påkrevd');
        }
        if (value!.length > 9) {
            return intlUtils(intl, 'valideringsfeil.varigEndringInntekt.forLang');
        }
        const valueNumber = getNumberFromNumberInputValue(value);
        if (valueNumber && valueNumber < 0) {
            return intlUtils(intl, 'valideringsfeil.varigEndringInntekt.mindreEnnNull');
        }
        return validateStringAsNumberInput(
            value!,
            intlUtils(intl, 'valideringsfeil.varigEndringInntekt.ugyldigFormat'),
        );
    };

export const validateEgenNæringVarigEndringBeskrivelse =
    (intl: IntlShape, label: string) => (value: string | undefined) => {
        if (!hasValue(value) || (value && value.trim() === '')) {
            return intlUtils(intl, 'valideringsfeil.egenNæringVarigEndringBeskrivelse.påkrevd');
        }

        if (value!.length > TEXT_INPUT_MAX_LENGTH) {
            return intlUtils(intl, 'valideringsfeil.egenNæringVarigEndringBeskrivelse.forLang');
        }

        if (value!.length < TEXT_INPUT_MIN_LENGTH) {
            return intlUtils(intl, 'valideringsfeil.egenNæringVarigEndringBeskrivelse.forKort');
        }

        return validateTextInputField(value, label, intl);
    };

export const validateEgenNæringNavn =
    (intl: IntlShape, label: string, erValgfri: boolean) => (value: string | undefined) => {
        if (!erValgfri && !hasValue(value)) {
            return intlUtils(intl, 'valideringsfeil.egenNæringNavn.påkrevd');
        }
        if (value && value.length > 100) {
            return intlUtils(intl, 'valideringsfeil.egenNæringNavn.forLang');
        }
        return validateTextInputField(value, label, intl);
    };

export const validateEgenNæringLand = (intl: IntlShape) => (value: string | undefined) => {
    if (!hasValue(value)) {
        return intlUtils(intl, 'valideringsfeil.egenNæringLand.påkrevd');
    }
    if (hasValue(value) && value === 'NO') {
        return intlUtils(intl, 'valideringsfeil.egenNæringLand.ikkeNorge');
    }
    return undefined;
};

export const validateRegistrertINorge =
    (intl: IntlShape) => (registrertINorge: string | number | boolean | undefined) => {
        if (registrertINorge === undefined) {
            return intlUtils(intl, 'valideringsfeil.egenNæringRegistrertINorge.påkrevd');
        }

        return null;
    };

export const validateNæringPågående = (intl: IntlShape) => (næringPågående: string | number | boolean | undefined) => {
    if (næringPågående === undefined) {
        return intlUtils(intl, 'valideringsfeil.egenNæringPågående.påkrevd');
    }

    return null;
};

export const validateBlittYrkesaktivDe3SisteÅrene =
    (intl: IntlShape) => (blittYrkesaktivDe3SisteÅrene: string | number | boolean | undefined) => {
        if (blittYrkesaktivDe3SisteÅrene === undefined) {
            return intlUtils(intl, 'valideringsfeil.egenNæringBlittYrkesaktivDe3SisteÅrene.påkrevd');
        }

        return null;
    };

export const validateNæringstype = (intl: IntlShape) => (næringstype: string | number | boolean | undefined) => {
    if (!hasValue(næringstype)) {
        return intlUtils(intl, 'valideringsfeil.egenNæringType.påkrevd');
    }

    return null;
};

export const validateVarigEndring = (intl: IntlShape) => (varigEndring: string | number | boolean | undefined) => {
    if (!hasValue(varigEndring)) {
        return intlUtils(intl, 'valideringsfeil.egenNæringHattVarigEndringDeSiste4Årene.påkrevd');
    }

    return null;
};
