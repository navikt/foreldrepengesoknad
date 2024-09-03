import dayjs from 'dayjs';

import { Periodetype, TidsperiodeDate, andreAugust2022ReglerGjelder } from '@navikt/fp-common';
import { Stønadskonto } from '@navikt/fp-types';
import { isValidTidsperiode } from '@navikt/fp-utils';

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
