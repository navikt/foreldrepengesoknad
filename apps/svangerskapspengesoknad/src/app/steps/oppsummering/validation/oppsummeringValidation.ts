import { intlUtils } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';

export const validateHarGodkjentOppsummering = (intl: IntlShape) => (value: boolean) => {
    if (value !== true) {
        return intlUtils(intl, 'valideringsfeil.oppsummering.harGodkjentOppsummering.påkrevd');
    }

    return undefined;
};
