import { TidsperiodeDate } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import { erFarMedmorSinWLBPeriodeRundtFødsel } from 'app/utils/wlbUtils';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

const uttakRundtFødselÅrsakSpørsmålSkalBesvares = (
    periodetype: Periodetype,
    konto: StønadskontoType,
    tidsperiode: TidsperiodeDate,
    søkerErFarEllerMedmor: boolean,
    erFlerbarnssøknad: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean,
    ønskerFlerbarnsdager: boolean | undefined,
    søkerHarMidlertidigOmsorg: boolean,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon
): boolean => {
    if (
        erAleneOmOmsorg ||
        annenForelderKanIkkeOppgis ||
        søkerHarMidlertidigOmsorg ||
        !andreAugust2022ReglerGjelder(familiehendelsesdato) ||
        situasjon !== 'fødsel'
    ) {
        return false;
    }

    if (periodetype === Periodetype.Uttak && søkerErFarEllerMedmor) {
        if (
            erFarMedmorSinWLBPeriodeRundtFødsel(
                tidsperiode,
                familiehendelsesdato,
                periodetype,
                konto,
                søkerErFarEllerMedmor,
                termindato
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

export default uttakRundtFødselÅrsakSpørsmålSkalBesvares;
