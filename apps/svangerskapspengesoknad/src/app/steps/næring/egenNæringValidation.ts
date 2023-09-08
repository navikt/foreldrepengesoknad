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
import { fireUkerSiden } from 'app/utils/dateUtils';
import { hasValue } from 'app/utils/validationUtils';
import { IntlShape } from 'react-intl';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

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
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.erIFremtiden');
        }

        if (isDateABeforeDateB(tom, dateToISOString(fireUkerSiden(new Date())))) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.egenNæring.merEnn4UkerSiden');
        }

        if (isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
        }

        return undefined;
    };

export const validateEgenNæringOrgnr =
    (intl: IntlShape) =>
    (orgnr: string): SkjemaelementFeil => {
        if (!hasValue(orgnr)) {
            return intlUtils(intl, 'valideringsfeil.egenNæringOrgnr.påkrevd');
        }
        if (containsWhiteSpace(orgnr)) {
            return intlUtils(intl, 'valideringsfeil.egenNæringOrgnr.inneholderMellomrom');
        }
        if (!erGyldigNorskOrgnummer(orgnr)) {
            return intlUtils(intl, 'valideringsfeil.egenNæringOrgnr.ugyldigFormat');
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

export const validateEgenNæringResultat = (intl: IntlShape) => (value: string) => {
    if (!hasValue(value)) {
        return intlUtils(intl, 'valideringsfeil.egenNæringInntekt.påkrevd');
    } else {
        const valueNumber = getNumberFromNumberInputValue(value);

        if (!valueNumber || Math.round(valueNumber) !== valueNumber) {
            return intlUtils(intl, 'valideringsfeil.næringsinntekt.ugyldigFormat');
        }
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
