import { Satser } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

export const finnSisteGrunnbeløp = (satser: Satser): number => {
    return notEmpty(satser.grunnbeløp[0]).verdi;
};
