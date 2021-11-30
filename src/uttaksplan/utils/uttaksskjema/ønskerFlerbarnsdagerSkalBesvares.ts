import { isUttaksperiode, Periode } from 'uttaksplan/types/Periode';

export const ønskerFlerbarnsdagerSkalBesvares = (
    periode: Periode,
    erFlerbarnssøknad: boolean,
    søkerErFarEllerMedmor: boolean
): boolean => {
    return isUttaksperiode(periode) && erFlerbarnssøknad && søkerErFarEllerMedmor;
};
