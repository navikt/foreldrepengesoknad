import { intlUtils } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { SelectableBarn } from '../components/barnVelger/BarnVelger';

export const validateHarForståttRettigheterOgPlikter = (intl: IntlShape) => (value: boolean) => {
    if (value !== true) {
        return intlUtils(intl, 'valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd');
    }

    return undefined;
};

export const validateHarValgtEtBarn = (intl: IntlShape) => (value: SelectableBarn | undefined) => {
    if (value === undefined) {
        return intlUtils(intl, 'steg.footer.spørsmålMåBesvares');
    }

    return undefined;
};
