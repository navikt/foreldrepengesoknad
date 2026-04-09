import { IntlShape } from 'react-intl';

import { BrukerRolleSak_fpoversikt, RettighetType_fpoversikt } from '@navikt/fp-types';

export const finnTekstForMedmorEllerFar = (
    intl: IntlShape,
    søker: BrukerRolleSak_fpoversikt,
    rettighetType: RettighetType_fpoversikt,
    erMedmorDelAvSøknaden: boolean,
): string | undefined => {
    if (erMedmorDelAvSøknaden) {
        return intl.formatMessage({ id: 'OversiktSteg.Medmor' });
    }
    if (søker === 'FAR_MEDMOR' || rettighetType === 'BEGGE_RETT') {
        return intl.formatMessage({ id: 'OversiktSteg.Far' });
    }
    return undefined;
};

export const finnTekstForMorEllerFar = (
    intl: IntlShape,
    søker: BrukerRolleSak_fpoversikt,
    rettighetType: RettighetType_fpoversikt,
    erFarOgFar: boolean,
    erMedmorDelAvSøknaden: boolean,
): string | undefined => {
    if (erMedmorDelAvSøknaden) {
        return undefined;
    }

    if (!erFarOgFar && (søker === 'MOR' || rettighetType === 'BEGGE_RETT')) {
        return intl.formatMessage({ id: 'OversiktSteg.Mor' });
    }
    if (erFarOgFar && (søker === 'FAR_MEDMOR' || rettighetType === 'BEGGE_RETT')) {
        return intl.formatMessage({ id: 'OversiktSteg.Far' });
    }

    return undefined;
};
