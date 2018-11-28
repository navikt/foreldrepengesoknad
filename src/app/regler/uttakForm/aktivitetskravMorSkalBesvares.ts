import { StønadskontoType, isUttaksperiode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/s\u00F8knadsinfoSelector';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';

export const aktivitetskravMorSkalBesvares = (periode: UttakFormPeriodeType, søknadsinfo: Søknadsinfo): boolean => {
    const { søker, annenForelder, søknaden } = søknadsinfo;
    const { erDeltUttak } = søknaden;
    if (søker.erMor) {
        return false;
    }
    if (
        erDeltUttak &&
        (periode.konto === StønadskontoType.Fellesperiode || periode.konto === StønadskontoType.Foreldrepenger)
    ) {
        return true;
    } else if (erDeltUttak === false && annenForelder.harRett === false) {
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
