import { isISODateString } from '@navikt/ds-datepicker';
import { intlUtils, isDateABeforeDateB, isDateInTheFuture, validateTextInputField } from '@navikt/fp-common';
import { isDateAAfterDateB } from '@navikt/fp-utils';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { femMånederSiden } from 'app/utils/dateUtils';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validateArbeidIUtlandetFom = (intl: IntlShape, tom: string | undefined) => (fom: string) => {
    if (!hasValue(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.påkrevd');
    }
    if (hasValue(fom) && !isISODateString(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
    }

    if (hasValue(fom) && isDateInTheFuture(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
    }

    if (hasValue(fom) && tom && isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.førTilDato');
    }

    return undefined;
};

export const validateArbeidIUtlandetTom = (intl: IntlShape, fom: string | undefined) => (tom: string) => {
    if (!hasValue(tom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.påkrevd');
    }
    if (!isISODateString(tom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (isDateAAfterDateB(tom, dayjs().add(9, 'month'))) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.erIFremtiden');
    }

    if (isDateABeforeDateB(tom, dateToISOString(femMånederSiden()))) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.arbeidIUtlandet.merEnn5MånederSiden');
    }

    if (fom && isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
    }

    return undefined;
};

export const validateArbeidIUtlandetNavnArbeidsgiver =
    (intl: IntlShape, navnPåArbeidsgiverLabel: string) => (navn: string) => {
        if (!hasValue(navn)) {
            return intlUtils(intl, 'valideringsfeil.arbeidIUtlandetNavn.påkrevd');
        }
        if (navn.length > 100) {
            return intlUtils(intl, 'valideringsfeil.arbeidIUtlandetNavn.forLang');
        }
        return validateTextInputField(navn, navnPåArbeidsgiverLabel, intl);
    };
