import { addDays, getISODay } from 'date-fns';
import { Tidsperiode } from '../types';
import { Holiday } from 'date-holidays';
import { getOffentligeFridager } from 'common/util/fridagerUtils';

export const getUkedag = (dato: Date) => getISODay(dato);

/**
 * Wrapper en dato med uttaksdager-funksjonalitet
 * @param dato
 */
export const uttaksdagUtil = (dato: Date) => ({
    erUttaksdag: (): boolean => erUttaksdag(dato),
    forrige: (): Date => getUttaksdagFørDato(dato),
    neste: (): Date => getUttaksdagEtterDato(dato),
    denneEllerNeste: (): Date => getUttaksdagFraOgMedDato(dato),
    denneEllerForrige: (): Date => getUttaksdagTilOgMedDato(dato),
    leggTil: (uttaksdager: number): Date => {
        if (uttaksdager < 0) {
            return trekkUttaksdagerFraDato(dato, uttaksdager);
        } else if (uttaksdager > 0) {
            return leggUttaksdagerTilDato(dato, uttaksdager);
        }
        return dato;
    },
    periodeslutt: (uttaksdager: number) =>
        getSisteUttaksdagIPeriode(dato, uttaksdager)
});

/**
 * Wrapper en Tidsperiode med uttaksdager-funksjonalitet
 * @param dato
 */

export const uttakTidsperiodeUtil = (tidsperiode: Tidsperiode) => ({
    antallUttaksdager: (taBortFridager?: boolean) =>
        getAntallUttaksdagerITidsperiode(tidsperiode, taBortFridager),
    antallFridager: () => getUttaksdagerSomErFridager(tidsperiode).length
});

/**
 * Summerer antall uttaksdager som er i en eller flere perioder
 * @param tidsperioder
 */
export const getAntallUttaksdagerITidsperioder = (
    tidsperioder: Tidsperiode[]
): number => {
    return tidsperioder.reduce(
        (dager: number, tidsperiode: Tidsperiode) =>
            dager + getAntallUttaksdagerITidsperiode(tidsperiode),
        0
    );
};

/**
 * Returnerer om en dato er en uttaksdag
 * @param dato
 */
const erUttaksdag = (dato: Date): boolean =>
    getUkedag(dato) !== 6 && getUkedag(dato) !== 7;

/**
 * Finner første uttaksdag før dato
 * @param dato
 */
const getUttaksdagFørDato = (dato: Date): Date => {
    return getUttaksdagTilOgMedDato(addDays(dato, -1));
};

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den foregående fredag
 * @param dato
 */
const getUttaksdagTilOgMedDato = (dato: Date): Date => {
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
const getUttaksdagEtterDato = (dato: Date): Date =>
    getUttaksdagFraOgMedDato(addDays(dato, 1));

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den nærmeste påfølgende mandag
 * @param dato
 */
const getUttaksdagFraOgMedDato = (dato: Date): Date => {
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
 * Legger uttaksdager til en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
const leggUttaksdagerTilDato = (dato: Date, uttaksdager: number): Date => {
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
 * Trekker uttaksdager fra en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
const trekkUttaksdagerFraDato = (dato: Date, uttaksdager: number): Date => {
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

/**
 * Finner siste uttaksdag gitt en startdato og antall uttaksdager
 * @param startdato
 * @param uttaksdager
 */
const getSisteUttaksdagIPeriode = (
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
 * Finner uttaksdager som er offentlig fridag
 */
const getUttaksdagerSomErFridager = (tidsperiode: Tidsperiode): Holiday[] => {
    return getOffentligeFridager(tidsperiode).filter((dag) =>
        erUttaksdag(dag.date)
    );
};
