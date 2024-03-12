import { IntlShape } from 'react-intl';

import { intlUtils } from '@navikt/fp-common';
import { isISODateString } from '@navikt/fp-utils';

export const validateErAnnenStartdatoAdopsjonGyldig = (intl: IntlShape) => (annenStartdatoAdopsjon: string) => {
    if (!isISODateString(annenStartdatoAdopsjon)) {
        return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoAdopsjon.annenDato.gyldigDato');
    }

    return undefined;
};
