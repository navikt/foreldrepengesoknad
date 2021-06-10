import { hasValue, intlUtils } from '@navikt/fp-common';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';

export const validateFrilansoppstartsDato = (intl: IntlShape) => (oppstartsdato: string) => {
    if (!hasValue(oppstartsdato)) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppstartsDato.påkrevd');
    }

    if (!isISODateString(oppstartsdato)) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppstartsDato.ugyldigDatoFormat');
    }
};
