import { IntlShape } from 'react-intl';

import { hasValue, isDateInTheFuture } from '@navikt/fp-common';
import { isISODateString } from '@navikt/fp-utils';

import { isDateABeforeDateB } from 'app/utils/dateUtils';

export const validateAnnenInntektFom = (intl: IntlShape, tom: string) => (fom: string) => {
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

export const validateAnnenInntektTom = (intl: IntlShape, fom: string) => (tom: string) => {
    if (!hasValue(tom)) {
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.påkrevd' });
    }

    if (!isISODateString(tom)) {
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' });
    }

    if (isDateInTheFuture(tom)) {
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.erIFremtiden' });
    }

    if (isDateABeforeDateB(tom, fom)) {
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.etterFraDato' });
    }

    return undefined;
};
