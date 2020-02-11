import { UttakFormPeriodeType } from 'app/components/uttaksplanlegger/components/uttakForm/UttakForm';
import { isUttaksperiode } from 'app/types/uttaksplan/periodetyper';

export const ønskerFlerbarnsdagerSkalBesvares = (
    periode: UttakFormPeriodeType,
    erFlerbarnssøknad: boolean,
    søkerErFarEllerMedmor: boolean,
    morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg: boolean
): boolean => {
    if (morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg) {
        return false;
    }

    return isUttaksperiode(periode) && erFlerbarnssøknad && søkerErFarEllerMedmor;
};
