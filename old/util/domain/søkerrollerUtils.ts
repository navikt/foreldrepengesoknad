import { Kjønn } from '../../types/common';
import { Søkersituasjon, SøkerRolle } from '../../types/søknad/Søknad';

export const getSøkerrollerForBruker = (kjønn: Kjønn, situasjon: Søkersituasjon): SøkerRolle[] => {
    if (situasjon === Søkersituasjon.FØDSEL) {
        if (kjønn === Kjønn.KVINNE) {
            return [SøkerRolle.MOR, SøkerRolle.MEDMOR];
        }
    }
    if (situasjon === Søkersituasjon.ADOPSJON) {
        if (kjønn === Kjønn.KVINNE) {
            return [SøkerRolle.MOR /*, SøkerRolle.MEDMOR*/];
        }
        return [SøkerRolle.FAR /*, SøkerRolle.FAR2*/];
    }
    if (situasjon === Søkersituasjon.FORELDREANSVAR) {
        if (kjønn === Kjønn.KVINNE) {
            return [SøkerRolle.FORESATT, SøkerRolle.FORESATT2, SøkerRolle.MOR];
        }
        return [SøkerRolle.FORESATT, SøkerRolle.FORESATT2, SøkerRolle.FAR];
    }
    return [];
};
