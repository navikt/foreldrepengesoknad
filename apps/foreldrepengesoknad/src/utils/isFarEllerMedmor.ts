import { BrukerRolleSak_fpoversikt, NavnPåForeldre, Søkerrolle } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

export const isFarEllerMedmor = (rolle: Søkerrolle) => {
    return rolle === 'far' || rolle === 'medmor';
};

export const getForelderNavn = (
    forelder: BrukerRolleSak_fpoversikt | undefined,
    navnPåForeldre: NavnPåForeldre,
): string => {
    let forelderNavn: string;
    if (navnPåForeldre.farMedmor) {
        forelderNavn = forelder === 'MOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    } else {
        forelderNavn = forelder === 'MOR' ? navnPåForeldre.mor : '';
    }
    return capitalizeFirstLetter(forelderNavn);
};
