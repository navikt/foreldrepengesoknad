import {
    Periodetype,
    StønadskontoUttak,
    TidsperiodeDate,
    andreAugust2022ReglerGjelder,
    isValidTidsperiode,
} from '@navikt/fp-common';
import dayjs from 'dayjs';

const kontoSkalBesvares = (
    periodetype: Periodetype,
    tidsperiode: TidsperiodeDate,
    stønadskontoer: StønadskontoUttak[],
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
): boolean => {
    if (
        !isValidTidsperiode(tidsperiode) ||
        stønadskontoer.length === 0 ||
        (andreAugust2022ReglerGjelder(familiehendelsesdato) &&
            periodetype === Periodetype.Uttak &&
            erFarEllerMedmor &&
            dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'day'))
    ) {
        return false;
    }

    return true;
};

export default kontoSkalBesvares;
