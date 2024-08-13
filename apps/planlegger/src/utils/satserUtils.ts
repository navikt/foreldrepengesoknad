import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { Satser } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

dayjs.extend(isSameOrAfter);

export const finnSisteGrunnbeløp = (satser: Satser): number => {
    return notEmpty(satser.grunnbeløp[0]).verdi;
};

export const finnSisteEngangsstønad = (satser: Satser): number => {
    return notEmpty(satser.engangstønad[0]).verdi;
};
