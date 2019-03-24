import { Periode, isUttaksperiode, StønadskontoType } from 'app/types/uttaksplan/periodetyper';

export const aktivitetskravMorSkalBesvares = (
    periode: Periode,
    søkerErMor: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean
): boolean => {
    if (søkerErMor || erAleneOmOmsorg || !isUttaksperiode(periode) || annenForelderKanIkkeOppgis) {
        return false;
    }

    if (
        !erAleneOmOmsorg &&
        (periode.konto === StønadskontoType.Fellesperiode || periode.konto === StønadskontoType.Foreldrepenger)
    ) {
        if (isUttaksperiode(periode) && periode.ønskerFlerbarnsdager) {
            return false;
        }

        return true;
    }

    return false;
};
