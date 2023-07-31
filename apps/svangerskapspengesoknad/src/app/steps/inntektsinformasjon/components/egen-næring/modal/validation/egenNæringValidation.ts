import { isISODateString } from '@navikt/ds-datepicker';
import {
    SkjemaelementFeil,
    containsWhiteSpace,
    intlUtils,
    isDateABeforeDateB,
    isDateInTheFuture,
} from '@navikt/fp-common';
import { erGyldigNorskOrgnummer } from '@navikt/fp-common/src/common/utils/organisasjonUtils';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds/lib';
import { hasValue } from 'app/utils/validationUtils';
import { IntlShape } from 'react-intl';

export const validateEgenNæringFom =
    (intl: IntlShape, tom: string) =>
    (fom: string): SkjemaelementFeil => {
        if (hasValue(fom) && !isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
        }

        if (hasValue(fom) && isDateInTheFuture(fom)) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
        }

        if (hasValue(fom) && isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.førTilDato');
        }

        return undefined;
    };

export const validateEgenNæringTom =
    (intl: IntlShape, fom: string) =>
    (tom: string): SkjemaelementFeil => {
        if (hasValue(tom) && !isISODateString(tom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
        }

        if (hasValue(tom) && isDateInTheFuture(tom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.erIFremtiden');
        }

        if (hasValue(tom) && isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
        }

        return undefined;
    };

export const validateEgenNæringOrgnr =
    (intl: IntlShape) =>
    (orgnr: string): SkjemaelementFeil => {
        if (containsWhiteSpace(orgnr)) {
            return intlUtils(intl, 'valideringsfeil.egenNæringOrgnr.inneholderMellomrom');
        }
        if (hasValue(orgnr) && !erGyldigNorskOrgnummer(orgnr)) {
            return intlUtils(intl, 'valideringsfeil.egenNæringOrgnr.ugyldigFormat');
        }

        return undefined;
    };

export const validateEgenNæringYrkesAktivDatoDato = (intl: IntlShape) => (dato: string) => {
    if (hasValue(dato) && !isISODateString(dato)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (hasValue(dato) && isDateInTheFuture(dato)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
    }

    return undefined;
};

export const validateNumber = (intl: IntlShape, errorKey: string) => (value: string) => {
    if (hasValue(value)) {
        const valueNumber = getNumberFromNumberInputValue(value);

        if (!valueNumber || Math.round(valueNumber) !== valueNumber) {
            return intlUtils(intl, errorKey);
        }
    }

    return undefined;
};
