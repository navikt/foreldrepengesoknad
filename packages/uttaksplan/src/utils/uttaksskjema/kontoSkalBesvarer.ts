import dayjs from 'dayjs';

import { Periodetype, TidsperiodeDate, andreAugust2022ReglerGjelder, isValidTidsperiode } from '@navikt/fp-common';
import { Stønadskonto } from '@navikt/fp-types';

const kontoSkalBesvares = (
    periodetype: Periodetype,
    tidsperiode: TidsperiodeDate,
    stønadskontoer: Stønadskonto[],
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
