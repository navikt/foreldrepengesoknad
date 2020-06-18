import moment from 'moment';
import { Tidsperiode } from 'common/types';
import { Tidsperioden, isValidTidsperiode } from './Tidsperioden';
import { dateIsSameOrAfter, dateIsSameOrBefore } from '../dates/dates';

export const Tidsperiodene = (tidsperioder: Tidsperiode[]) => ({
    getAntallUttaksdager: () => getAntallUttaksdagerITidsperioder(tidsperioder),
    getTidsperioderFomDato: (dato: Date, inkluderPeriodeSomOverlapper?: boolean) =>
        getTidsperioderFomDato(dato, tidsperioder, inkluderPeriodeSomOverlapper),
    getTidsperioderTomDato: (dato: Date) => getTidsperioderTomDato(dato, tidsperioder),
    getTidsperiodeSomInneholderDato: (dato: Date) => getTidsperiodeSomOverlapperDato(dato, tidsperioder),
    sortOnFom: () => tidsperioder.sort(sortTidsperiodeFom),
    sortOnTom: () => tidsperioder.sort(sortTidsperiodeTom),
});

export function sortTidsperiodeFom(t1: Partial<Tidsperiode>, t2: Partial<Tidsperiode>) {
    if (isValidTidsperiode(t1) === false || isValidTidsperiode(t2) === false) {
        return isValidTidsperiode(t1) ? -1 : 1;
    }
    return moment(t1.fom).isBefore(t2.fom, 'day') ? -1 : 1;
}

function sortTidsperiodeTom(t1: Partial<Tidsperiode>, t2: Partial<Tidsperiode>) {
    if (isValidTidsperiode(t1) === false || isValidTidsperiode(t2) === false) {
        return isValidTidsperiode(t1) ? -1 : 1;
    }
    return moment(t1.tom).isBefore(t2.tom, 'day') ? -1 : 1;
}

function getAntallUttaksdagerITidsperioder(tidsperioder: Tidsperiode[]): number {
    return tidsperioder.reduce(
        (dager: number, tidsperiode: Tidsperiode) => dager + Tidsperioden(tidsperiode).getAntallUttaksdager(),
        0
    );
}

function getTidsperioderTomDato(dato: Date, tidsperioder: Tidsperiode[]): Tidsperiode[] {
    return tidsperioder.filter((t) => isValidTidsperiode(t) && dateIsSameOrBefore(t.tom, dato));
}

function getTidsperioderFomDato(
    dato: Date,
    tidsperioder: Tidsperiode[],
    inkluderPeriodeSomOverlapper?: boolean
): Tidsperiode[] {
    return tidsperioder.filter(
        (t) =>
            isValidTidsperiode(t) &&
            (dateIsSameOrAfter(t.fom, dato) ||
                (inkluderPeriodeSomOverlapper && dateIsSameOrBefore(t.fom, dato) && dateIsSameOrAfter(t.tom, dato)))
    );
}

function getTidsperiodeSomOverlapperDato(dato: Date, tidsperioder: Tidsperiode[]): Tidsperiode | undefined {
    return tidsperioder.find((t) => moment(dato).isBetween(t.fom, t.tom, 'day', '[]'));
}
