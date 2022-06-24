import { TidsperiodeDate } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { Periodetype } from 'uttaksplan/types/Periode';

export const ønskerFlerbarnsdagerSkalBesvares = (
    periodetype: Periodetype,
    erFlerbarnssøknad: boolean,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    tidsperiode: TidsperiodeDate
): boolean => {
    if (dayjs(tidsperiode.fom).isBefore(familiehendelsesdato)) {
        return false;
    }

    return periodetype === Periodetype.Uttak && erFlerbarnssøknad && søkerErFarEllerMedmor;
};
