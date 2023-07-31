import { isISODateString } from '@navikt/ds-datepicker';
import { intlUtils, isDateABeforeDateB, isDateInTheFuture } from '@navikt/fp-common';
import { fireUkerSiden } from 'app/utils/dateUtils';
import { hasValue } from 'app/utils/validationUtils';
import { IntlShape } from 'react-intl';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

export const validateArbeidIUtlandetFom = (intl: IntlShape, tom: string | undefined) => (fom: string) => {
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
    if (hasValue(tom) && !isISODateString(tom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (hasValue(tom) && isDateInTheFuture(tom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.erIFremtiden');
    }

    if (hasValue(tom) && isDateABeforeDateB(tom, dateToISOString(fireUkerSiden(new Date())))) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.arbeidIUtlandet.merEnn4UkerSiden');
    }

    if (hasValue(tom) && fom && isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
    }

    return undefined;
};
