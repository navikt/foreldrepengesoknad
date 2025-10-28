import dayjs from 'dayjs';

import { Periodetype, Situasjon, TidsperiodeDate } from '@navikt/fp-common';
import { KontoTypeUttak_fpoversikt } from '@navikt/fp-types';

import { Uttaksdatoer, erInnenFørsteSeksUkerFødselFarMedmor } from '../uttaksdatoerUtils';
import { uttakRundtFødselÅrsakSpørsmålSkalBesvares } from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';

const erMorForForSykSkalBesvares = (
    periodetype: Periodetype,
    konto: KontoTypeUttak_fpoversikt,
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
        konto as KontoTypeUttak_fpoversikt,
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
        konto === 'AKTIVITETSFRI_KVOTE'
    ) {
        return false;
    }

    if (periodetype === Periodetype.Uttak && søkerErFarEllerMedmor) {
        if (
            (konto === 'FEDREKVOTE' || konto === 'FORELDREPENGER') &&
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
// eslint-disable-next-line import/no-default-export
export default erMorForForSykSkalBesvares;
