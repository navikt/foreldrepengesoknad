import { isISODateString } from '@navikt/ds-datepicker';
import { intlUtils, isDateABeforeDateB, isDateInTheFuture } from '@navikt/fp-common';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { fireUkerSiden } from 'app/utils/dateUtils';
import { hasValue } from 'app/utils/validationUtils';
import { IntlShape } from 'react-intl';

export const validateFrilansStart = (intl: IntlShape, tom: string) => (fom: string) => {
    if (hasValue(fom) && !isISODateString(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
    }

    if (hasValue(fom) && isDateInTheFuture(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
    }

    if (hasValue(fom) && tom && isISODateString(tom) && isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.førTilDato');
    }

    return undefined;
};

export const validateFrilansSlutt = (intl: IntlShape, pågående: YesOrNo, fom: string) => (tom: string) => {
    if (pågående === YesOrNo.YES) {
        return undefined;
    }

    if (hasValue(tom) && !isISODateString(tom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (hasValue(tom) && isDateInTheFuture(tom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.erIFremtiden');
    }

    if (hasValue(tom) && isDateABeforeDateB(tom, dateToISOString(fireUkerSiden(new Date())))) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.merEnn4UkerSiden');
    }

    if (hasValue(tom) && fom && isISODateString(fom) && isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
    }

    return undefined;
};
