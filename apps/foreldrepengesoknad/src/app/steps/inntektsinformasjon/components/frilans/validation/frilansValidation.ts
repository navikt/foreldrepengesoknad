import { IntlShape } from 'react-intl';

import { hasValue, isDateInTheFuture, validateTextInputField } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/fp-formik';
import { isISODateString } from '@navikt/fp-utils';

import { isDateABeforeDateB } from '../../../../../utils/dateUtils';

export const validateNavnPåOppdragsgiver = (intl: IntlShape, label: string) => (navn: string) => {
    if (!hasValue(navn) || navn.trim() === '') {
        return intl.formatMessage({
            id: 'valideringsfeil.inntektsinformasjon.frilansoppdrag.navnPåOppdragsgiver.påkrevd',
        });
    }

    if (navn.length > 100) {
        return intl.formatMessage({
            id: 'valideringsfeil.inntektsinformasjon.frilansoppdrag.navnPåOppdragsgiver.lengde',
        });
    }

    return validateTextInputField(navn, label, intl);
};

export const validateOppdragFom = (intl: IntlShape, tom: string, oppstartsdato: string) => (fom: string) => {
    if (!hasValue(fom)) {
        return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.påkrevd' });
    }

    if (!isISODateString(fom)) {
        return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.gyldigDato' });
    }

    if (isDateInTheFuture(fom)) {
        return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.erIFremtiden' });
    }

    if (isDateABeforeDateB(fom, oppstartsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.inntektsinformasjon.frilansoppdrag.fom.førOppstartsdato' });
    }

    if (isDateABeforeDateB(tom, fom)) {
        return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.førTilDato' });
    }

    return undefined;
};

export const validatePågåendeOppdrag = (intl: IntlShape) => (pågående: YesOrNo) => {
    if (pågående === YesOrNo.UNANSWERED) {
        return intl.formatMessage({ id: 'valideringsfeil.inntektsinformasjon.frilansoppdrag.pågående.påkrevd' });
    }

    return undefined;
};

export const validateOppdragTom =
    (intl: IntlShape, pågående: YesOrNo, fom: string, oppstartsdato: string) => (tom: string) => {
        if (pågående === YesOrNo.YES) {
            return undefined;
        }

        if (!hasValue(tom)) {
            return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.påkrevd' });
        }

        if (!isISODateString(tom)) {
            return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' });
        }

        if (isDateInTheFuture(tom)) {
            return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.erIFremtiden' });
        }

        if (isDateABeforeDateB(tom, oppstartsdato)) {
            return intl.formatMessage({
                id: 'valideringsfeil.inntektsinformasjon.frilansoppdrag.tom.førOppstartsdato',
            });
        }

        if (isDateABeforeDateB(tom, fom)) {
            return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.etterFraDato' });
        }

        return undefined;
    };
