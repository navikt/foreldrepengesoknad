import { TidsperiodeDate } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const ønskerFlerbarnsdagerSkalBesvares = (
    periodetype: Periodetype,
    erFlerbarnssøknad: boolean,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    tidsperiode: TidsperiodeDate,
    stønadskontoType: StønadskontoType
): boolean => {
    if (dayjs(tidsperiode.fom).isBefore(familiehendelsesdato)) {
        return false;
    }

    if (stønadskontoType === StønadskontoType.AktivitetsfriKvote) {
        return false;
    }

    return periodetype === Periodetype.Uttak && erFlerbarnssøknad && søkerErFarEllerMedmor;
};
