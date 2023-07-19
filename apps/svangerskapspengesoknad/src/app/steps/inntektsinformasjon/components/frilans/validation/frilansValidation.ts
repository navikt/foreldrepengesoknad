import { isISODateString } from '@navikt/ds-datepicker';
import { hasValue, intlUtils, isDateABeforeDateB, isDateInTheFuture } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { IntlShape } from 'react-intl';

export const validateFrilansStart = (intl: IntlShape, tom: string) => (fom: string) => {
    console.log('validating start');
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

export const validatePågåendeOppdrag = (intl: IntlShape) => (pågående: YesOrNo) => {
    console.log('validating pågående');
    if (pågående === YesOrNo.UNANSWERED) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppdrag.pågående.påkrevd');
    }

    return undefined;
};

export const validateFrilansSlutt = (intl: IntlShape, pågående: YesOrNo, fom: string) => (tom: string) => {
    console.log('validating slutt');
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

    if (isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
    }

    return undefined;
};
