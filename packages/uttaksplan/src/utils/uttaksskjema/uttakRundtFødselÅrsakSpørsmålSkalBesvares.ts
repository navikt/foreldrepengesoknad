import dayjs from 'dayjs';

import { Periodetype, Situasjon, TidsperiodeDate } from '@navikt/fp-common';
import { KontoTypeUttak_fpoversikt } from '@navikt/fp-types';

import { andreAugust2022ReglerGjelder } from '../../utils/dateUtils';
import { erFarMedmorSinWLBTidsperiodeRundtFødsel } from '../../utils/wlbUtils';

export const uttakRundtFødselÅrsakSpørsmålSkalBesvares = (
    periodetype: Periodetype,
    konto: KontoTypeUttak_fpoversikt,
    tidsperiode: TidsperiodeDate,
    søkerErFarEllerMedmor: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean,
    søkerHarMidlertidigOmsorg: boolean,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon,
    bareFarMedmorHarRett: boolean,
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
            )
        ) {
            return true;
        }
        return false;
    }
    return false;
};
