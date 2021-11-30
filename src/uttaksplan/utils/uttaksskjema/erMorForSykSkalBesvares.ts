import { Situasjon } from 'app/types/Situasjon';
import { isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { erInnenFørsteSeksUkerFødselFarMedmor, Uttaksdatoer } from '../uttaksdatoerUtils';

const erMorForForSykSkalBesvares = (
    periode: Periode,
    situasjon: Situasjon,
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
