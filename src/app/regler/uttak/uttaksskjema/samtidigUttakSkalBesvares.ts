import { isUttaksperiode, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from '../../../components/uttak-form/UttakForm';

const samtidigUttakSkalBesvares = (
    periode: UttakFormPeriodeType,
    erUttakInnenFørsteSeksUkerFødselFarMedmor: boolean,
    erUttakFørFødsel: boolean,
    erAleneOmsorg: boolean
): boolean => {
    if (erAleneOmsorg) {
        return false;
    }

    if (isUttaksperiode(periode)) {
        if (periode.erMorForSyk) {
            return true;
        }

        const erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager =
            erUttakInnenFørsteSeksUkerFødselFarMedmor &&
            (periode.konto === StønadskontoType.Fedrekvote || periode.konto === StønadskontoType.Foreldrepenger) &&
            periode.ønskerFlerbarnsdager !== true;

        return erUttakFørFødsel || erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager ? false : true;
    }

    return false;
};

export default samtidigUttakSkalBesvares;
