import { UttakFormPeriodeType } from '../../../components/uttaksplanlegger/components/uttakForm/UttakForm';
import { StønadskontoType, isUttaksperiode } from '../../../types/uttaksplan/periodetyper';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { Uttaksdatoer } from '../../../selectors/types';
import { erInnenFørsteSeksUkerFødselFarMedmor } from '../../periodeegenskaper/erInnenFørsteSeksUkerFødselFarMedmor';

const erMorForForSykSkalBesvares = (
    periode: UttakFormPeriodeType,
    situasjon: Søkersituasjon,
    søkerErFarEllerMedmor: boolean,
    uttaksdatoer: Uttaksdatoer,
    erFlerbarnssøknad: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean,
    søkerHarMidlertidigOmsorg: boolean
): boolean => {
    if (erAleneOmOmsorg || annenForelderKanIkkeOppgis || søkerHarMidlertidigOmsorg) {
        return false;
    }

    if (isUttaksperiode(periode) && søkerErFarEllerMedmor) {
        const { konto } = periode;
        if (
            (konto === StønadskontoType.Fedrekvote || konto === StønadskontoType.Foreldrepenger) &&
            erInnenFørsteSeksUkerFødselFarMedmor(
                periode.tidsperiode,
                situasjon,
                søkerErFarEllerMedmor,
                uttaksdatoer.etterFødsel.førsteUttaksdagEtterSeksUker
            )
        ) {
            if (erFlerbarnssøknad) {
                return periode.ønskerFlerbarnsdager !== undefined && periode.ønskerFlerbarnsdager === false;
            }

            return true;
        }
        return false;
    }

    return false;
};

export default erMorForForSykSkalBesvares;
