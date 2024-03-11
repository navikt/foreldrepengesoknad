import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { IntlShape } from 'react-intl';

import { intlUtils, isDateABeforeDateB, isDateInTheFuture } from '@navikt/fp-common';
import { isISODateString } from '@navikt/fp-utils';

import { fireUkerSiden } from 'app/utils/dateUtils';
import { hasValue } from 'app/utils/validationUtils';

export const validateFrilansStart = (intl: IntlShape) => (fom: string) => {
    if (!hasValue(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.påkrevd');
    }

    if (!isISODateString(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
    }

    if (isDateInTheFuture(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
    }

    // if (hasValue(tom) && isISODateString(tom) && isDateABeforeDateB(tom, fom)) {
    //     return intlUtils(intl, 'valideringsfeil.fraOgMedDato.førTilDato');
    // }

    return undefined;
};

export const validateFrilansSlutt = (intl: IntlShape, pågående: YesOrNo, fom: string) => (tom: string) => {
    if (pågående === YesOrNo.YES) {
        return undefined;
    }
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
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.frilans.merEnn4UkerSiden');
    }

    if (hasValue(fom) && isISODateString(fom) && isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
    }

    return undefined;
};

export const validateJobberFortsattSomFrilanser =
    (intl: IntlShape) => (jobberFremdelesSomFrilanser: string | number | boolean) => {
        if (jobberFremdelesSomFrilanser === undefined) {
            return intlUtils(intl, 'valideringsfeil.jobberFremdelesSomFrilans.påkrevd');
        }

        return null;
    };
