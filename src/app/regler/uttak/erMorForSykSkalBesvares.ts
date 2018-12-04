import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import { StønadskontoType, Periode } from '../../types/uttaksplan/periodetyper';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import { Uttaksdatoer } from '../../selectors/types';
import { erInnenFørsteSeksUkerFødselFarMedmor } from '../søknadsperioden/erInnenFørsteSeksUkerFødselFarMedmor';

const erMorForForSykSkalBesvares = (
    periode: UttakFormPeriodeType,
    situasjon: Søkersituasjon,
    søkerErFarEllerMedmor: boolean,
    uttaksdatoer: Uttaksdatoer,
    erFlerbarnssøknad: boolean
): boolean => {
    const { konto } = periode;
    if (
        konto === StønadskontoType.Fedrekvote &&
        erInnenFørsteSeksUkerFødselFarMedmor(periode as Periode, situasjon, søkerErFarEllerMedmor, uttaksdatoer) &&
        erFlerbarnssøknad === false
    ) {
        return true;
    }
    return false;
};

export default erMorForForSykSkalBesvares;
