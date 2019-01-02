import { isUttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';

const samtidigUttakSkalBesvares = (
    periode: UttakFormPeriodeType,
    velgbareStønadskontotyper: StønadskontoType[],
    erDeltUttak: boolean,
    erUttakInnenFørsteSeksUkerFødselFarMedmor: boolean,
    erUttakFørFødsel: boolean
): boolean => {
    const harFlerbarnsdager = velgbareStønadskontotyper.includes(StønadskontoType.Flerbarnsdager) === true;

    const erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager =
        erUttakInnenFørsteSeksUkerFødselFarMedmor &&
        periode.konto === StønadskontoType.Fedrekvote &&
        harFlerbarnsdager === false;

    if (
        isUttaksperiode(periode) === false ||
        erUttakFørFødsel ||
        erDeltUttak === false ||
        erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager
    ) {
        return false;
    }

    return true;
};

export default samtidigUttakSkalBesvares;
