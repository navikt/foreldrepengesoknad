import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { hasValue, intlUtils } from '@navikt/fp-common';
import { isISODateString } from '@navikt/fp-utils';

export const validateFrilansoppstartsDato = (intl: IntlShape) => (oppstartsdato: string) => {
    if (!hasValue(oppstartsdato)) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppstartsDato.påkrevd');
    }

    if (!isISODateString(oppstartsdato)) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppstartsDato.ugyldigDatoFormat');
    }

    if (dayjs().isBefore(dayjs(oppstartsdato), 'day')) {
        return intlUtils(intl, 'valideringsfeil.inntektsinformasjon.frilansoppstartsDato.kanIkkeVæreFremITid');
    }

    return undefined;
};
