import dayjs from 'dayjs';

import { TidsperiodeDate } from '@navikt/fp-types';

import { Periode } from 'app/types/Periode';

import { ISOStringToDate } from './dateUtils';

export function isValidTidsperiode(tidsperiode: TidsperiodeDate): boolean {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
}

export const Tidsperioden = (tidsperiode: TidsperiodeDate) => ({
    inneholderDato: (dato: Date) => inneholderTidsperiodeDato(tidsperiode, dato),
    erOmsluttetAv: (tidsperiode2: TidsperiodeDate) => erTidsperiodeOmsluttetAvTidsperiode(tidsperiode, tidsperiode2),
    overlapper: (tidsperiode2: TidsperiodeDate) => overlapperTidsperioder(tidsperiode, tidsperiode2),
});

function erTidsperiodeOmsluttetAvTidsperiode(tidsperiode1: TidsperiodeDate, tidsperiode2: TidsperiodeDate): boolean {
    if (isValidTidsperiode(tidsperiode1) && isValidTidsperiode(tidsperiode2)) {
        return (
            dayjs(tidsperiode1.fom).isSameOrAfter(tidsperiode2.fom) &&
            dayjs(tidsperiode1.tom).isSameOrBefore(tidsperiode2.tom)
        );
    }
    return false;
}

function inneholderTidsperiodeDato(tidsperiode: TidsperiodeDate, dato: Date): boolean {
    if (!tidsperiode.fom || !tidsperiode.tom) {
        return false;
    }

    return dayjs(dato).isBetween(tidsperiode.fom, tidsperiode.tom, 'days', '[]');
}

const overlapperTidsperioder = (t1: TidsperiodeDate, t2: TidsperiodeDate) => {
    return (
        dayjs(t1.fom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t1.tom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t2.fom).isBetween(t1.fom, t1.tom, 'day', '[]') ||
        dayjs(t2.tom).isBetween(t1.fom, t1.tom, 'day', '[]')
    );
};

export const getTidsperiode = (periode: Periode): TidsperiodeDate => {
    return {
        fom: ISOStringToDate(periode.fom)!,
        tom: ISOStringToDate(periode.tom)!,
    };
};
