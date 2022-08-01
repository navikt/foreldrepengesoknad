import { TidsperiodeDate } from '@navikt/fp-common';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const ønskerFlerbarnsdagerSkalBesvares = (
    periodetype: Periodetype,
    erFlerbarnssøknad: boolean,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    tidsperiode: TidsperiodeDate,
    stønadskontoType: StønadskontoType,
    bareFarHarRett: boolean,
    antallBarn: number,
    erAleneOmOmsorg: boolean
): boolean => {
    if (dayjs(tidsperiode.fom).isBefore(familiehendelsesdato)) {
        return false;
    }

    if (stønadskontoType === StønadskontoType.AktivitetsfriKvote) {
        return false;
    }
    if (
        søkerErFarEllerMedmor &&
        (bareFarHarRett || erAleneOmOmsorg) &&
        antallBarn > 1 &&
        andreAugust2022ReglerGjelder(familiehendelsesdato)
    ) {
        return false;
    }

    return periodetype === Periodetype.Uttak && erFlerbarnssøknad && søkerErFarEllerMedmor;
};
