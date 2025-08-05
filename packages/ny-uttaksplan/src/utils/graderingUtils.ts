import { Gradering, UttakArbeidType } from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';

import { Planperiode } from '../types/Planperiode';

type GraderingsType = {
    skalDuJobbe: boolean;
    stillingsprosent: string;
};

export const getGraderingsInfo = (periode: Planperiode | undefined): GraderingsType | undefined => {
    if (periode && periode.gradering) {
        return {
            skalDuJobbe: true,
            stillingsprosent: periode.gradering.arbeidstidprosent.toString(),
        };
    }

    return undefined;
};

export const getGradering = (skalDuJobbe: boolean, stillingsprosent: string | undefined): Gradering | undefined => {
    if (skalDuJobbe) {
        return {
            aktivitet: {
                type: UttakArbeidType.ORDINÆRT_ARBEID,
            },
            arbeidstidprosent: getFloatFromString(stillingsprosent) ?? 100,
        };
    }

    return undefined;
};
