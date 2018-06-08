import { Kjønn } from '../types/common';
import { SøkerRolle } from '../types/søknad/Søknad';

export const erFarEllerMedmor = (
    kjønn: Kjønn,
    søkerRolle: SøkerRolle
): boolean => kjønn === Kjønn.MANN || søkerRolle === SøkerRolle.MEDMOR;
