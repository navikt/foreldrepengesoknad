import { TidsperiodeDate } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';
import dayjs from 'dayjs';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { uttakRundtFødselÅrsakSpørsmålSkalBesvares } from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';

const samtidigUttakSkalBesvares = (
    periodetype: Periodetype,
    konto: StønadskontoType,
    erUttakInnenFørsteSeksUkerFødselFarMedmor: boolean,
    erUttakFørFødsel: boolean,
    erAleneOmsorg: boolean,
    erDeltUttakINorge: boolean,
    søkerHarMidlertidigOmsorg: boolean,
    erMorForSyk: boolean | undefined,
    ønskerFlerbarnsdager: boolean | undefined,
    tidsperiode: TidsperiodeDate,
    søkerErFarEllerMedmor: boolean,
    annenforelderKanIkkeOppgis: boolean,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon,
    bareFarMedmorHarRett: boolean
): boolean => {
    if (erAleneOmsorg || !erDeltUttakINorge || søkerHarMidlertidigOmsorg) {
        return false;
    }
    if (søkerErFarEllerMedmor && dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'd')) {
        return false;
    }
    if (
        uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            periodetype,
            konto,
            tidsperiode,
            søkerErFarEllerMedmor,
            erAleneOmsorg,
            annenforelderKanIkkeOppgis,
            søkerHarMidlertidigOmsorg,
            familiehendelsesdato,
            termindato,
            situasjon,
            bareFarMedmorHarRett
        )
    ) {
        return false;
    }

    if (periodetype === Periodetype.Uttak) {
        if (erMorForSyk) {
            return false;
        }

        const erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager: boolean =
            erUttakInnenFørsteSeksUkerFødselFarMedmor &&
            (konto === StønadskontoType.Fedrekvote || konto === StønadskontoType.Foreldrepenger) &&
            ønskerFlerbarnsdager !== true;

        return !(erUttakFørFødsel || erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager);
    }

    return false;
};

export default samtidigUttakSkalBesvares;
