import { addDays, getISODay } from 'date-fns';
import { Tidsperiode, Periodetype, Periode } from '../types';
import { Holiday } from 'date-holidays';
import { getOffentligeFridager } from 'common/util/fridagerUtils';

export const getUkedag = (dato: Date) => getISODay(dato);

export const erUttaksdag = (dato: Date): boolean =>
    getUkedag(dato) !== 6 && getUkedag(dato) !== 7;

/**
 * Finner første uttaksdag før dato
 * @param dato
 */
export const getForsteUttaksdagFørDato = (dato: Date): Date => {
    return getForsteUttaksdagPaEllerForDato(addDays(dato, -1));
};

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den foregående fredag
 * @param dato
 */
export const getForsteUttaksdagPaEllerForDato = (dato: Date): Date => {
    switch (getUkedag(dato)) {
        case 6:
            return addDays(dato, -1);
        case 7:
            return addDays(dato, -2);
        default:
            return dato;
    }
};

/**
 * Første gyldige uttaksdag etter dato
 * @param termin
 */
export const getForsteUttaksdagEtterDato = (dato: Date): Date =>
    getForsteUttaksdagPaEllerEtterDato(addDays(dato, 1));

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den nærmeste påfølgende mandag
 * @param dato
 */
export const getForsteUttaksdagPaEllerEtterDato = (dato: Date): Date => {
    switch (getUkedag(dato)) {
        case 6:
            return addDays(dato, 2);
        case 7:
            return addDays(dato, 1);
        default:
            return dato;
    }
};

/**
 * Summerer antall uttaksdager som er i periodene
 * @param perioder
 */
export const getAntallUttaksdagerIPerioder = (perioder: Periode[]): number => {
    return perioder.reduce((dager: number, periode: Periode) => {
        if (periode.type !== Periodetype.Utsettelse) {
            return (
                dager + getAntallUttaksdagerITidsperiode(periode.tidsperiode)
            );
        }
        return dager;
    }, 0);
};

/**
 * Summerer antall uttaksdager i angitt tidsperiode
 */
export const getAntallUttaksdagerITidsperiode = (
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
        if (erUttaksdag(startdato)) {
            antall++;
        }
        startdato.setDate(startdato.getDate() + 1);
    }
    if (taBortFridager) {
        fridager = getUttaksdagerSomErFridager(tidsperiode).length;
    }
    return antall - fridager;
};

export interface UkerOgDager {
    dager: number;
    uker: number;
}

/**
 * Legger til dager til en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
export const leggUttaksdagerTilDato = (
    dato: Date,
    uttaksdager: number
): Date => {
    let nyDato = dato;
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller <= uttaksdager) {
        const tellerdato = addDays(dato, dagteller++);
        if (erUttaksdag(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato;
};

/**
 * Finner siste uttaksdag gitt en startdato og antall uttaksdager
 * @param startdato
 * @param uttaksdager
 */
export const getSisteUttaksdagIPeriode = (
    startdato: Date,
    uttaksdager: number
): Date => {
    let nyDato = startdato;
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller < uttaksdager) {
        const tellerdato = addDays(startdato, dagteller++);
        if (erUttaksdag(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato;
};

/**
 * Trekker uttaksdager fra en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
export const trekkUttaksdagerFraDato = (
    dato: Date,
    uttaksdager: number
): Date => {
    let nyDato = dato;
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller < Math.abs(uttaksdager)) {
        const tellerdato = addDays(dato, --dagteller);
        if (erUttaksdag(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato;
};

export const getUttaksdagerSomErFridager = (
    tidsperiode: Tidsperiode
): Holiday[] => {
    return getOffentligeFridager(tidsperiode).filter((dag) =>
        erUttaksdag(dag.date)
    );
};
