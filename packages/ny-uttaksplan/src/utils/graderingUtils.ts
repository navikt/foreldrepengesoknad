import { Gradering, UttakArbeidType } from '@navikt/fp-types';

import { Planperiode } from '../types/Planperiode';

export type GraderingsType = {
    skalDuJobbe: boolean;
    stillingsprosent: number;
};

export const getGraderingsInfo = (periode: Planperiode | undefined): GraderingsType | undefined => {
    if (periode && periode.gradering) {
        return {
            skalDuJobbe: true,
            stillingsprosent: periode.gradering.arbeidstidprosent,
        };
    }

    return undefined;
};

export const getGradering = (skalDuJobbe: boolean, stillingsprosent: number | undefined): Gradering | undefined => {
    if (skalDuJobbe) {
        return {
            aktivitet: {
                type: UttakArbeidType.ORDINÆRT_ARBEID,
            },
            arbeidstidprosent: stillingsprosent ?? 100,
        };
    }

    return undefined;
};
