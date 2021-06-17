import { hasValue, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { isDateInTheFuture, isDateABeforeDateB } from 'app/utils/dateUtils';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';

export const validateNavnPåOppdragsgiver = (intl: IntlShape) => (navn: string) => {
    if (!hasValue(navn)) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppdrag.navnPåOppdragsgiver.påkrevd');
    }

    return undefined;
};

export const validateOppdragFom = (intl: IntlShape, tom: string, oppstartsdato: string) => (fom: string) => {
    if (!hasValue(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.påkrevd');
    }

    if (!isISODateString(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
    }

    if (isDateInTheFuture(fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.erIFremtiden');
    }

    if (isDateABeforeDateB(fom, oppstartsdato)) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppdrag.fom.førOppstartsdato');
    }

    if (isDateABeforeDateB(tom, fom)) {
        return intlUtils(intl, 'valideringsfeil.fraOgMedDato.førTilDato');
    }

    return undefined;
};

export const validatePågåendeOppdrag = (intl: IntlShape) => (pågående: YesOrNo) => {
    if (pågående === YesOrNo.UNANSWERED) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppdrag.pågående.påkrevd');
    }

    return undefined;
};

export const validateOppdragTom =
    (intl: IntlShape, pågående: YesOrNo, fom: string, oppstartsdato: string) => (tom: string) => {
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

        if (isDateABeforeDateB(tom, oppstartsdato)) {
            return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppdrag.tom.førOppstartsdato');
        }

        if (isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.tilOgMedDato.etterFraDato');
        }

        return undefined;
    };
