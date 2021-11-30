import { isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const aktivitetskravMorSkalBesvares = (
    periode: Periode,
    søkerErMor: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean,
    søkerHarMidlertidigOmsorg: boolean
): boolean => {
    if (
        søkerErMor ||
        erAleneOmOmsorg ||
        !isUttaksperiode(periode) ||
        annenForelderKanIkkeOppgis ||
        søkerHarMidlertidigOmsorg
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
