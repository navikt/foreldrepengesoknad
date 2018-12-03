import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import { erUttakInnenFørsteSeksUkerFødselFarMedmor } from '../perioder/erUttakInnenFørsteSeksUkerFødselFarMedmor';
import { isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Uttaksdatoer } from '../../selectors/types';

const erMorForForSykSkalBesvares = (
    periode: UttakFormPeriodeType,
    situasjon: Søkersituasjon,
    søkerErFarEllerMedmor: boolean,
    uttaksdatoer: Uttaksdatoer,
    erFlerbarnssøknad: boolean
): boolean => {
    const { konto, tidsperiode } = periode;
    if (
        isValidTidsperiode(tidsperiode) &&
        konto === StønadskontoType.Fedrekvote &&
        erUttakInnenFørsteSeksUkerFødselFarMedmor(tidsperiode, situasjon, søkerErFarEllerMedmor, uttaksdatoer) &&
        erFlerbarnssøknad === false
    ) {
        return true;
    }
    return false;
};

export default erMorForForSykSkalBesvares;
