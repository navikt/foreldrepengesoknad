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
    return {
        startdato,
        sluttdato: uttaksdagUtil(startdato).periodeslutt(uttaksdager)
    };
};

const erTidsperioderLike = (t1: Tidsperiode, t2: Tidsperiode) =>
    JSON.stringify(t1) === JSON.stringify(t2);
