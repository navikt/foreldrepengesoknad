import { BrukerRolleSak_fpoversikt, NavnPåForeldre, Søkerrolle } from '@navikt/fp-types';
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
    const forelderNavn = navnPåForeldre.farMedmor
        ? forelder === 'MOR'
            ? navnPåForeldre.mor
            : navnPåForeldre.farMedmor
        : forelder === 'MOR'
          ? navnPåForeldre.mor
          : '';
    return capitalizeFirstLetter(forelderNavn);
};
