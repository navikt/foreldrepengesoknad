import { Søknadsinfo } from '../../selectors/s\u00F8knadsinfoSelector';
import { Periode, isUttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import { getPeriodeRegler } from '../perioder/periodeRegler';

const samtidigUttakSkalBesvares = (
    periode: UttakFormPeriodeType,
    velgbareStønadskontotyper: StønadskontoType[],
    søknadsinfo: Søknadsinfo
): boolean => {
    const { erDeltUttak } = søknadsinfo.søknaden;
    const periodeRegler = getPeriodeRegler(søknadsinfo);
    const harFlerbarnsdager = velgbareStønadskontotyper.includes(StønadskontoType.Flerbarnsdager) === true;

    const erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager =
        periodeRegler.erUttakInnenFørsteSeksUkerFødselFarMedmor(periode.tidsperiode) &&
        periode.konto === StønadskontoType.Fedrekvote &&
        harFlerbarnsdager === false;

    if (
        periode.konto === undefined ||
        isUttaksperiode(periode) === false ||
        periodeRegler.erUttakFørFødsel(periode as Periode) ||
        erDeltUttak === false ||
        erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager
    ) {
        return false;
    }

    return true;
};

export default samtidigUttakSkalBesvares;
