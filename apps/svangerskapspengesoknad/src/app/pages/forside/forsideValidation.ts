import { intlUtils } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';

export const validateHarForståttRettigheterOgPlikter = (intl: IntlShape) => (value: boolean) => {
    if (value !== true) {
        return intlUtils(intl, 'forside.valideringsfeil.harForståttRettigheterOgPlikter');
    }

    return undefined;
};
