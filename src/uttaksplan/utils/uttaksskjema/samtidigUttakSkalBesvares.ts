import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

const samtidigUttakSkalBesvares = (
    periodetype: Periodetype,
    konto: StønadskontoType,
    erUttakInnenFørsteSeksUkerFødselFarMedmor: boolean,
    erUttakFørFødsel: boolean,
    erAleneOmsorg: boolean,
    erDeltUttak: boolean,
    søkerHarMidlertidigOmsorg: boolean,
    erMorForSyk: boolean | undefined,
    ønskerFlerbarnsdager: boolean | undefined
): boolean => {
    if (erAleneOmsorg || !erDeltUttak || søkerHarMidlertidigOmsorg) {
        return false;
    }

    if (periodetype === Periodetype.Uttak) {
        if (erMorForSyk) {
            return false;
        }

        const erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager: boolean =
            erUttakInnenFørsteSeksUkerFødselFarMedmor &&
            (konto === StønadskontoType.Fedrekvote || konto === StønadskontoType.Foreldrepenger) &&
            ønskerFlerbarnsdager !== true;

        return !(erUttakFørFødsel || erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager);
    }

    return false;
};

export default samtidigUttakSkalBesvares;
