import { StønadskontoType, isUttaksperiode, Periode } from '../../types/uttaksplan/periodetyper';

export const aktivitetskravMorSkalBesvares = (
    periode: Periode,
    søkerErMor: boolean,
    annenForelderHarRett: boolean,
    erDeltUttak: boolean
): boolean => {
    if (søkerErMor) {
        return false;
    }
    if (
        isUttaksperiode(periode) &&
        erDeltUttak &&
        (periode.konto === StønadskontoType.Fellesperiode || periode.konto === StønadskontoType.Foreldrepenger)
    ) {
        return true;
    }
    if (erDeltUttak === false && annenForelderHarRett === false) {
        if (
            (isUttaksperiode(periode) && periode.harIkkeAktivitetskrav === true) ||
            isUttaksperiode(periode) === false
        ) {
            return false;
        }
        return true;
    }
    return false;
};
