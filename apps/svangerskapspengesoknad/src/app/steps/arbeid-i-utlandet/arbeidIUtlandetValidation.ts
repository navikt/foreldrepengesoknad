import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { intlUtils, isDateABeforeDateB, isDateInTheFuture, validateTextInputField } from '@navikt/fp-common';
import { isDateAAfterDateB, isISODateString } from '@navikt/fp-utils';

import { femMånederSiden } from 'app/utils/dateUtils';
import { hasValue } from 'app/utils/validationUtils';

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

export const validateArbeidIUtlandetPågående = (intl: IntlShape) => (pågående: YesOrNo) => {
    if (!hasValue(pågående)) {
        return intlUtils(intl, 'valideringsfeil.arbeidIUtlandetPågående.påkrevd');
    }
    return undefined;
};

export const validateArbeidIUtlandetLand = (intl: IntlShape) => (land: string) => {
    if (!hasValue(land)) {
        return intlUtils(intl, 'valideringsfeil.arbeidIUtlandetLand.påkrevd');
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
