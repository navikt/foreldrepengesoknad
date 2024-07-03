import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { Satser } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

dayjs.extend(isSameOrAfter);

export const finnGrunnbeløp = (satser: Satser, dato: string | Dayjs) => {
    const { grunnbeløp } = satser;
    const aktueltGrunnbeløp = grunnbeløp.find((grunnbeløpData) => dayjs(dato).isSameOrAfter(grunnbeløpData.fom));
    return notEmpty(aktueltGrunnbeløp).verdi;
};

export const finnEngangsstønad = (satser: Satser, dato: string | Dayjs) => {
    const { engangstønad } = satser;
    const aktuellEngangsstønad = engangstønad.find((engangsstønadData) =>
        dayjs(dato).isSameOrAfter(engangsstønadData.fom),
    );
    return notEmpty(aktuellEngangsstønad).verdi;
};
