import { isISODateString } from '@navikt/ds-datepicker';
import { intlUtils } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';

export const validateErAnnenStartdatoAdopsjonGyldig = (intl: IntlShape) => (annenStartdatoAdopsjon: string) => {
    if (!isISODateString(annenStartdatoAdopsjon)) {
        return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoAdopsjon.annenDato.gyldigDato');
    }

    return undefined;
};
