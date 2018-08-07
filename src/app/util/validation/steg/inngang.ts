import { Kjønn } from '../../../types/common';
import { SøkerRolle, Søkersituasjon } from '../../../types/søknad/Søknad';

export const inngangErGyldig = (
    situasjon: Søkersituasjon,
    søkerRolle: SøkerRolle,
    kjønn: Kjønn
): boolean =>
    søkerRolle !== undefined ||
    situasjon === Søkersituasjon.STEBARN ||
    (situasjon === Søkersituasjon.FØDSEL && kjønn === Kjønn.MANN);
