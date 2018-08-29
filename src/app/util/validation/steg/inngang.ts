import { Kjønn } from '../../../types/common';
import { SøkerRolle, Søkersituasjon } from '../../../types/søknad/Søknad';

export const inngangErGyldig = (
    situasjon: Søkersituasjon,
    søkerRolle: SøkerRolle,
    kjønn: Kjønn,
    erRolleGyldig: boolean
): boolean =>
    (søkerRolle !== undefined && erRolleGyldig) || (situasjon === Søkersituasjon.FØDSEL && kjønn === Kjønn.MANN);
