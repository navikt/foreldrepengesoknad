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
    erAleneOmOmsorg: boolean,
    erDeltUttakINorge: boolean
): boolean => {
    if (dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'day')) {
        return false;
    }

    if (stønadskontoType === StønadskontoType.AktivitetsfriKvote) {
        return false;
    }
    if (søkerErFarEllerMedmor && (bareFarHarRett || erAleneOmOmsorg) && antallBarn > 1) {
        if (andreAugust2022ReglerGjelder(familiehendelsesdato)) {
            return false;
        }
        return true;
    }
    console.log(erDeltUttakINorge);
    if (!erDeltUttakINorge && stønadskontoType !== StønadskontoType.Fellesperiode) {
        return false;
    }

    return periodetype === Periodetype.Uttak && erFlerbarnssøknad && søkerErFarEllerMedmor;
};
