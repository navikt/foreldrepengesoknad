import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { hasValue } from '@navikt/fp-common';
import { isISODateString } from '@navikt/fp-utils';

export const validateFrilansoppstartsDato = (intl: IntlShape) => (oppstartsdato: string) => {
    if (!hasValue(oppstartsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.inntektsinformasjon.frilansoppstartsDato.påkrevd' });
    }

    if (!isISODateString(oppstartsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.inntektsinformasjon.frilansoppstartsDato.ugyldigDatoFormat' });
    }

    if (dayjs().isBefore(dayjs(oppstartsdato), 'day')) {
        return intl.formatMessage({
            id: 'valideringsfeil.inntektsinformasjon.frilansoppstartsDato.kanIkkeVæreFremITid',
        });
    }

    return undefined;
};
