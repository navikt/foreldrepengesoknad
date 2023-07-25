import { isISODateString } from '@navikt/ds-datepicker';
import { hasValue, intlUtils, isDateABeforeDateB, isDateInTheFuture } from '@navikt/fp-common';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { fireUkerSiden } from 'app/utils/dateUtils';
import { IntlShape } from 'react-intl';

export const validateFrilansStart = (intl: IntlShape, tom: string, submitClicked: boolean) => (fom: string) => {
    if (submitClicked && !hasValue(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.påkrevd');
    }

    if (!isISODateString(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
    }

    if (isDateInTheFuture(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
    }

    if (tom && isISODateString(tom) && isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.førTilDato');
    }

    return undefined;
};

export const validatePågåendeOppdrag = (intl: IntlShape, submitClicked: boolean) => (pågående: YesOrNo) => {
    if (submitClicked && pågående === YesOrNo.UNANSWERED) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppdrag.pågående.påkrevd');
    }

    return undefined;
};

export const validateFrilansSlutt =
    (intl: IntlShape, pågående: YesOrNo, fom: string, submitClicked: boolean) => (tom: string) => {
        if (pågående === YesOrNo.YES) {
            return undefined;
        }

        if (submitClicked && !hasValue(tom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.påkrevd');
        }

        if (!isISODateString(tom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
        }

        if (isDateInTheFuture(tom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.erIFremtiden');
        }

        if (isDateABeforeDateB(tom, dateToISOString(fireUkerSiden(new Date())))) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.merEnn4UkerSiden');
        }

        if (fom && isISODateString(fom) && isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
        }

        return undefined;
    };
