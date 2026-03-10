import dayjs from 'dayjs';

import { Tidsperiode } from '@navikt/fp-types';

import { dateStringIsSameOrAfter, dateStringIsSameOrBefore } from './dateUtils';

export class TidsperiodenString {
    private readonly tidsperiode: Tidsperiode;

    private constructor(tidsperiode: Tidsperiode) {
        this.tidsperiode = tidsperiode;
    }

    static forPeriode(tidsperiode: Tidsperiode): TidsperiodenString {
        return new TidsperiodenString(tidsperiode);
    }

    static forFomOgTom(fom: string, tom: string): TidsperiodenString {
        return new TidsperiodenString({ fom, tom });
    }

    erLik(tidsperiode2: Tidsperiode) {
        return erTidsperioderLikeString(this.tidsperiode, tidsperiode2);
    }

    overlapper(tidsperiode2: Tidsperiode) {
        return overlapperTidsperioder(this.tidsperiode, tidsperiode2);
    }

    erOmsluttetAv(tidsperiode2: Tidsperiode) {
        return erTidsperiodeOmsluttetAvTidsperiode(this.tidsperiode, tidsperiode2);
    }

    erUtenfor(tidsperiode2: Tidsperiode) {
        return erTidsperiodeUtenforTidsperiode(this.tidsperiode, tidsperiode2);
    }

    erFomLikEllerEtterDato(dato: string) {
        return erTidsperiodeFomLikEllerEtterDato(this.tidsperiode, dato);
    }

    erFomFørDato(dato: string) {
        return erTidsperiodeFomLikEllerEtterDato(this.tidsperiode, dato) === false;
    }

    inneholderDato(dato: string) {
        return inneholderTidsperiodeDato(this.tidsperiode, dato);
    }

    slutterEtter(dato: string) {
        const { tom } = this.tidsperiode;
        if (!tom || !this.erGyldig()) {
            return false;
        }
        return dayjs(tom).isAfter(dato, 'day');
    }

    erGyldig() {
        return isValidTidsperiodeString(this.tidsperiode);
    }
}

const overlapperTidsperioder = (t1: Tidsperiode, t2: Tidsperiode) => {
    return (
        dayjs(t1.fom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t1.tom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t2.fom).isBetween(t1.fom, t1.tom, 'day', '[]') ||
        dayjs(t2.tom).isBetween(t1.fom, t1.tom, 'day', '[]')
    );
};

const inneholderTidsperiodeDato = (tidsperiode: Tidsperiode, dato: string): boolean => {
    if (!tidsperiode.fom || !tidsperiode.tom) {
        return false;
    }

    return dayjs(dato).isBetween(tidsperiode.fom, tidsperiode.tom, 'days', '[]');
};

const isValidTidsperiodeString = (tidsperiode: Tidsperiode): tidsperiode is Tidsperiode => {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
};

const erTidsperioderLikeString = (t1: Tidsperiode, t2: Tidsperiode) => {
    if (isValidTidsperiodeString(t1) && isValidTidsperiodeString(t2)) {
        return dayjs(t1.fom).isSame(t2.fom, 'day') && dayjs(t1.tom).isSame(t2.tom, 'day');
    }
    return JSON.stringify(t1) === JSON.stringify(t2);
};

const erTidsperiodeOmsluttetAvTidsperiode = (tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean => {
    if (isValidTidsperiodeString(tidsperiode1) && isValidTidsperiodeString(tidsperiode2)) {
        return (
            dateStringIsSameOrAfter(tidsperiode1.fom, tidsperiode2.fom) &&
            dateStringIsSameOrBefore(tidsperiode1.tom, tidsperiode2.tom)
        );
    }
    return false;
};

const erTidsperiodeUtenforTidsperiode = (tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean => {
    if (isValidTidsperiodeString(tidsperiode1) && isValidTidsperiodeString(tidsperiode2)) {
        return (
            dayjs(tidsperiode1.fom).isAfter(tidsperiode2.tom, 'day') ||
            dayjs(tidsperiode1.tom).isBefore(tidsperiode2.fom, 'day')
        );
    }
    return false;
};

const erTidsperiodeFomLikEllerEtterDato = (tidsperiode: Tidsperiode, dato: string): boolean => {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrAfter(dato, 'day')
    );
};
