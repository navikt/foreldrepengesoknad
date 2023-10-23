import { Periodetype, Situasjon, StønadskontoType, TidsperiodeDate } from '@navikt/fp-common';
import dayjs from 'dayjs';
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
    termindato: Date | undefined,
    bareFarMedmorHarRett: boolean,
): boolean => {
    const årsakTilUttakRundtFødselSkalBesvares = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
        periodetype,
        konto as StønadskontoType,
        tidsperiode,
        søkerErFarEllerMedmor,
        erAleneOmOmsorg,
        annenForelderKanIkkeOppgis,
        søkerHarMidlertidigOmsorg,
        familiehendelsesdato,
        termindato,
        situasjon,
        bareFarMedmorHarRett,
    );

    if (
        erAleneOmOmsorg ||
        annenForelderKanIkkeOppgis ||
        søkerHarMidlertidigOmsorg ||
        årsakTilUttakRundtFødselSkalBesvares ||
        dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'day') ||
        konto === StønadskontoType.AktivitetsfriKvote
    ) {
        return false;
    }

    if (periodetype === Periodetype.Uttak && søkerErFarEllerMedmor) {
        if (
            (konto === StønadskontoType.Fedrekvote || konto === StønadskontoType.Foreldrepenger) &&
            erInnenFørsteSeksUkerFødselFarMedmor(
                tidsperiode,
                situasjon,
                søkerErFarEllerMedmor,
                uttaksdatoer.etterFødsel.førsteUttaksdagEtterSeksUker,
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
