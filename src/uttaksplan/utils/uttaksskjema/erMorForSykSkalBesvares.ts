import { TidsperiodeDate } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { erInnenFørsteSeksUkerFødselFarMedmor, Uttaksdatoer } from '../uttaksdatoerUtils';
import uttakRundtFødselÅrsakSpørsmålSkalBesvares from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';

const erMorForForSykSkalBesvares = (
    periodetype: Periodetype,
    konto: StønadskontoType,
    tidsperiode: TidsperiodeDate,
    situasjon: Situasjon,
    søkerErFarEllerMedmor: boolean,
    uttaksdatoer: Uttaksdatoer,
    erFlerbarnssøknad: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean,
    ønskerFlerbarnsdager: boolean | undefined,
    søkerHarMidlertidigOmsorg: boolean,
    familiehendelsesdato: Date,
    termindato: Date | undefined
): boolean => {
    const årsakTilUttakRundtFødselSkalBesvares = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
        periodetype,
        konto as StønadskontoType,
        tidsperiode,
        søkerErFarEllerMedmor,
        erFlerbarnssøknad,
        erAleneOmOmsorg,
        annenForelderKanIkkeOppgis,
        ønskerFlerbarnsdager,
        søkerHarMidlertidigOmsorg,
        familiehendelsesdato,
        termindato,
        situasjon
    );

    if (
        erAleneOmOmsorg ||
        annenForelderKanIkkeOppgis ||
        søkerHarMidlertidigOmsorg ||
        årsakTilUttakRundtFødselSkalBesvares
    ) {
        return false;
    }

    if (periodetype === Periodetype.Uttak && søkerErFarEllerMedmor) {
        if (
            (konto === StønadskontoType.Fedrekvote ||
                konto === StønadskontoType.Foreldrepenger ||
                konto === StønadskontoType.AktivitetsfriKvote) &&
            erInnenFørsteSeksUkerFødselFarMedmor(
                tidsperiode,
                situasjon,
                søkerErFarEllerMedmor,
                uttaksdatoer.etterFødsel.førsteUttaksdagEtterSeksUker
            )
        ) {
            if (erFlerbarnssøknad) {
                return ønskerFlerbarnsdager !== undefined && ønskerFlerbarnsdager === false;
            }

            return true;
        }
        return false;
    }

    return false;
};

export default erMorForForSykSkalBesvares;
