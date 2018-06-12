import { Holiday } from 'date-holidays';
import { Tidsperiode } from 'common/types';
import { uttaksdagUtil } from 'uttaksplan/utils/dataUtils';
import { getOffentligeFridager } from 'common/util/fridagerUtils';

/**
 * Wrapper en Tidsperiode med uttaksdager-funksjonalitet
 * @param dato
 */

export const tidsperiodeUtil = (tidsperiode: Tidsperiode) => ({
    setStartdato: (startdato: Date) => flyttTidsperiode(tidsperiode, startdato),
    antallUttaksdager: (taBortFridager?: boolean) =>
        getAntallUttaksdagerITidsperiode(tidsperiode, taBortFridager),
    antallFridager: () => getUttaksdagerSomErFridager(tidsperiode).length,
    erLik: (tidsperiode2: Tidsperiode) =>
        erTidsperioderLike(tidsperiode, tidsperiode2)
});

export const getTidsperiode = (
    startdato: Date,
    uttaksdager: number
): Tidsperiode => {
    if (!uttaksdagUtil(startdato).erUttaksdag()) {
        throw new Error('Startdato er ikke en uttaksdag');
    }
    return {
        startdato,
        sluttdato: uttaksdagUtil(startdato).leggTil(uttaksdager - 1)
    };
};

/**
 * Summerer antall uttaksdager som er i en eller flere perioder
 * @param tidsperioder
 */
export const getAntallUttaksdagerITidsperioder = (
    tidsperioder: Tidsperiode[],
    taBortFridager?: boolean
): number => {
    return tidsperioder.reduce(
        (dager: number, tidsperiode: Tidsperiode) =>
            dager +
            getAntallUttaksdagerITidsperiode(tidsperiode, taBortFridager),
        0
    );
};

/**
 * Summerer antall uttaksdager i angitt tidsperiode
 */
const getAntallUttaksdagerITidsperiode = (
    tidsperiode: Tidsperiode,
    taBortFridager?: boolean
): number => {
    if (tidsperiode.startdato > tidsperiode.sluttdato) {
        return -1;
    }
    const startdato = new Date(tidsperiode.startdato.getTime());
    const sluttdato = new Date(tidsperiode.sluttdato.getTime());
    let antall = 0;
    let fridager = 0;
    while (startdato <= sluttdato) {
        if (uttaksdagUtil(startdato).erUttaksdag()) {
            antall++;
        }
        startdato.setDate(startdato.getDate() + 1);
    }
    if (taBortFridager) {
        fridager = getUttaksdagerSomErFridager(tidsperiode).length;
    }
    return antall - fridager;
};

/**
 * Finner uttaksdager som er offentlig fridag
 */
const getUttaksdagerSomErFridager = (tidsperiode: Tidsperiode): Holiday[] => {
    return getOffentligeFridager(tidsperiode).filter((dag) =>
        uttaksdagUtil(dag.date).erUttaksdag()
    );
};

const flyttTidsperiode = (
    tidsperiode: Tidsperiode,
    startdato: Date
): Tidsperiode => {
    const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
    return getTidsperiode(startdato, uttaksdager);
};

const erTidsperioderLike = (t1: Tidsperiode, t2: Tidsperiode) =>
    JSON.stringify(t1) === JSON.stringify(t2);
