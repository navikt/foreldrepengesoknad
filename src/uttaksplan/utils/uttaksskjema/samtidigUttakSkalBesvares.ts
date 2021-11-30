import { isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

const samtidigUttakSkalBesvares = (
    periode: Periode,
    erUttakInnenFørsteSeksUkerFødselFarMedmor: boolean,
    erUttakFørFødsel: boolean,
    erAleneOmsorg: boolean,
    erDeltUttak: boolean,
    søkerHarMidlertidigOmsorg: boolean
): boolean => {
    if (erAleneOmsorg || !erDeltUttak || søkerHarMidlertidigOmsorg) {
        return false;
    }

    if (isUttaksperiode(periode)) {
        if (periode.erMorForSyk) {
            return false;
        }

        const erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager: boolean =
            erUttakInnenFørsteSeksUkerFødselFarMedmor &&
            (periode.konto === StønadskontoType.Fedrekvote || periode.konto === StønadskontoType.Foreldrepenger) &&
            periode.ønskerFlerbarnsdager !== true;

        return !(erUttakFørFødsel || erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager);
    }

    return false;
};

export default samtidigUttakSkalBesvares;
