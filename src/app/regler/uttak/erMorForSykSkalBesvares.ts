import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import { StønadskontoType, isUttaksperiode, isOverføringsperiode } from '../../types/uttaksplan/periodetyper';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import { Uttaksdatoer } from '../../selectors/types';
import { erInnenFørsteSeksUkerFødselFarMedmor } from '../periodeegenskaper/erInnenFørsteSeksUkerFødselFarMedmor';
import { Tidsperiode } from 'common/types';

const erMorForForSykSkalBesvares = (
    periode: UttakFormPeriodeType,
    situasjon: Søkersituasjon,
    søkerErFarEllerMedmor: boolean,
    uttaksdatoer: Uttaksdatoer,
    erFlerbarnssøknad: boolean
): boolean => {
    if (isUttaksperiode(periode) || isOverføringsperiode(periode)) {
        const { konto } = periode;
        if (
            konto === StønadskontoType.Fedrekvote &&
            erInnenFørsteSeksUkerFødselFarMedmor(
                periode.tidsperiode as Tidsperiode,
                situasjon,
                søkerErFarEllerMedmor,
                uttaksdatoer.etterFødsel.førsteUttaksdagEtterSeksUker
            ) &&
            erFlerbarnssøknad === false
        ) {
            return true;
        }
        return false;
    }

    return false;
};

export default erMorForForSykSkalBesvares;
