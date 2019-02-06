import { isUttaksperiode, StønadskontoType, isOverføringsperiode } from '../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';

const samtidigUttakSkalBesvares = (
    periode: UttakFormPeriodeType,
    velgbareStønadskontotyper: StønadskontoType[],
    erDeltUttak: boolean,
    erUttakInnenFørsteSeksUkerFødselFarMedmor: boolean,
    erUttakFørFødsel: boolean
): boolean => {
    if (isUttaksperiode(periode) || isOverføringsperiode(periode)) {
        const harFlerbarnsdager = velgbareStønadskontotyper.includes(StønadskontoType.Flerbarnsdager) === true;

        const erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager =
            erUttakInnenFørsteSeksUkerFødselFarMedmor &&
            periode.konto === StønadskontoType.Fedrekvote &&
            harFlerbarnsdager === false;

        if (
            periode.konto === undefined ||
            isUttaksperiode(periode) === false ||
            erUttakFørFødsel ||
            erDeltUttak === false ||
            erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager
        ) {
            return false;
        }

        return true;
    }

    return false;
};

export default samtidigUttakSkalBesvares;
