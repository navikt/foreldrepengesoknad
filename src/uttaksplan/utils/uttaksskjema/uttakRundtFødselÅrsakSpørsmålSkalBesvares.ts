import { TidsperiodeDate } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import { erFarMedmorSinWLBTidsperiodeRundtFødsel } from 'app/utils/wlbUtils';
import dayjs from 'dayjs';
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
    situasjon: Situasjon,
    bareFarMedmorHarRett: boolean
): boolean => {
    if (
        erAleneOmOmsorg ||
        annenForelderKanIkkeOppgis ||
        søkerHarMidlertidigOmsorg ||
        !søkerErFarEllerMedmor ||
        bareFarMedmorHarRett ||
        !andreAugust2022ReglerGjelder(familiehendelsesdato) ||
        situasjon !== 'fødsel' ||
        dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'day')
    ) {
        return false;
    }

    if (periodetype === Periodetype.Uttak) {
        if (
            erFarMedmorSinWLBTidsperiodeRundtFødsel(
                tidsperiode,
                familiehendelsesdato,
                periodetype,
                konto,
                søkerErFarEllerMedmor,
                termindato,
                situasjon,
                erFlerbarnssøknad,
                ønskerFlerbarnsdager
            )
        ) {
            return true;
        }
        return false;
    }

    return false;
};

export default uttakRundtFødselÅrsakSpørsmålSkalBesvares;
