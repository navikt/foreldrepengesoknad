import { isUttaksperiode, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from '../../../components/uttaksplanlegger/components/uttakForm/UttakForm';

const samtidigUttakSkalBesvares = (
    periode: UttakFormPeriodeType,
    erUttakInnenFørsteSeksUkerFødselFarMedmor: boolean,
    erUttakFørFødsel: boolean,
    erAleneOmsorg: boolean,
    erDeltUttak: boolean,
    morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg: boolean
): boolean => {
    if (erAleneOmsorg || !erDeltUttak || morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg) {
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
