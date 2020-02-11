import { Periode, isUttaksperiode, StønadskontoType } from 'app/types/uttaksplan/periodetyper';

export const aktivitetskravMorSkalBesvares = (
    periode: Periode,
    søkerErMor: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean,
    morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg: boolean
): boolean => {
    if (
        søkerErMor ||
        erAleneOmOmsorg ||
        !isUttaksperiode(periode) ||
        annenForelderKanIkkeOppgis ||
        morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg
    ) {
        return false;
    }

    if (
        !erAleneOmOmsorg &&
        (periode.konto === StønadskontoType.Fellesperiode || periode.konto === StønadskontoType.Foreldrepenger)
    ) {
        if (
            (isUttaksperiode(periode) && periode.ønskerFlerbarnsdager) ||
            (isUttaksperiode(periode) && periode.ønskerSamtidigUttak) ||
            (isUttaksperiode(periode) && periode.erMorForSyk && periode.konto === StønadskontoType.Fellesperiode)
        ) {
            return false;
        }

        return true;
    }

    return false;
};
