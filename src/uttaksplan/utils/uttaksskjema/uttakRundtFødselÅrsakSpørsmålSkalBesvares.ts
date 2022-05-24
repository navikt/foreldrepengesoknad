import { TidsperiodeDate } from '@navikt/fp-common';
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
    familiehendelsesdato: Date
): boolean => {
    if (erAleneOmOmsorg || annenForelderKanIkkeOppgis || søkerHarMidlertidigOmsorg) {
        return false;
    }

    if (periodetype === Periodetype.Uttak && søkerErFarEllerMedmor) {
        if (
            erFarMedmorSinWLBPeriodeRundtFødsel(
                tidsperiode,
                familiehendelsesdato,
                periodetype,
                konto,
                søkerErFarEllerMedmor
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
