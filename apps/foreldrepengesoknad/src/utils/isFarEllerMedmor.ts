import { NavnPåForeldre, Søkerrolle } from '@navikt/fp-common';
import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

export const isFarEllerMedmor = (rolle: Søkerrolle) => {
    if (rolle === 'far' || rolle === 'medmor') {
        return true;
    }

    return false;
};

export const getForelderNavn = (
    forelder: BrukerRolleSak_fpoversikt | undefined,
    navnPåForeldre: NavnPåForeldre,
): string => {
    let forelderNavn = '';
    if (navnPåForeldre.farMedmor) {
        forelderNavn = forelder === 'MOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    } else {
        forelderNavn = forelder === 'MOR' ? navnPåForeldre.mor : '';
    }
    return capitalizeFirstLetter(forelderNavn);
};
