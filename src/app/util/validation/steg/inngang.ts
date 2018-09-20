import { Kjønn } from '../../../types/common';
import { Søkersituasjon } from '../../../types/søknad/Søknad';

export const inngangErGyldig = (situasjon: Søkersituasjon, kjønn: Kjønn, erRolleGyldig: boolean): boolean =>
    situasjon !== Søkersituasjon.FORELDREANSVAR &&
    (erRolleGyldig || (situasjon === Søkersituasjon.FØDSEL && kjønn === Kjønn.MANN));
