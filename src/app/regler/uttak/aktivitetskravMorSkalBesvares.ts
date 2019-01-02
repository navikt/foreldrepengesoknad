import { StønadskontoType, isUttaksperiode } from '../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';

export const aktivitetskravMorSkalBesvares = (
    periode: UttakFormPeriodeType,
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
            isUttaksperiode(periode) === false ||
            periode.konto === StønadskontoType.Flerbarnsdager
        ) {
            return false;
        }
        return true;
    }
    return false;
};
