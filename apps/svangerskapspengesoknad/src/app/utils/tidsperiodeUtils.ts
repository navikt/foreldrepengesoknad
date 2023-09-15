import { Tidsperiode } from '@navikt/fp-common';
import dayjs from 'dayjs';

export const overlapperTidsperioder = (t1: Tidsperiode, t2: Tidsperiode) => {
    return (
        dayjs(t1.fom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t1.tom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t2.fom).isBetween(t1.fom, t1.tom, 'day', '[]') ||
        dayjs(t2.tom).isBetween(t1.fom, t1.tom, 'day', '[]')
    );
};

export const getTidsperiode = (fom: string, tom: string): Tidsperiode => {
    return {
        fom,
        tom,
    };
};
