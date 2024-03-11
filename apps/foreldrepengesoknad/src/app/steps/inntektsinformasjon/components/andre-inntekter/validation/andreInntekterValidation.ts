import { IntlShape } from 'react-intl';

import { hasValue, intlUtils, isDateInTheFuture } from '@navikt/fp-common';
import { isISODateString } from '@navikt/fp-utils';

import { isDateABeforeDateB } from 'app/utils/dateUtils';

export const validateAnnenInntektFom = (intl: IntlShape, tom: string) => (fom: string) => {
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

export const validateAnnenInntektTom = (intl: IntlShape, fom: string) => (tom: string) => {
    if (!hasValue(tom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.påkrevd');
    }

    if (!isISODateString(tom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (isDateInTheFuture(tom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.erIFremtiden');
    }

    if (isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
    }

    return undefined;
};
