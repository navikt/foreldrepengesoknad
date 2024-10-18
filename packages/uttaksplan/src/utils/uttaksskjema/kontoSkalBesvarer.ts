import dayjs from 'dayjs';

import { Periodetype, TidsperiodeDate } from '@navikt/fp-common';
import { Stønadskonto } from '@navikt/fp-types';
import { isValidTidsperiodeString } from '@navikt/fp-utils';

import { andreAugust2022ReglerGjelder } from '../../utils/dateUtils';

const kontoSkalBesvares = (
    periodetype: Periodetype,
    tidsperiode: TidsperiodeDate,
    stønadskontoer: Stønadskonto[],
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
): boolean => {
    if (
        !isValidTidsperiodeString(tidsperiode) ||
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
