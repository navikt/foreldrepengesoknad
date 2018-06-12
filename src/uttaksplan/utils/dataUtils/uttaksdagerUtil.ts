import { addDays, getISODay, isAfter, isSameDay, isBefore } from 'date-fns';
import { tidsperiodeUtil } from 'uttaksplan/utils/dataUtils';

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
    uttaksdagerFremTilDato: (tildato: Date) =>
        getUttaksdagerFremTilDato(dato, tildato)
});

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
 * Finner antall uttaksdager som er mellom to datoer
 * @param fra
 * @param til
 */
const getUttaksdagerFremTilDato = (fra: Date, til: Date): number => {
    const startdato: Date = uttaksdagUtil(fra).neste();
    const sluttdato: Date = uttaksdagUtil(til).forrige();

    if (isSameDay(startdato, sluttdato) || isAfter(startdato, sluttdato)) {
        return 0;
    }
    if (isBefore(startdato, sluttdato)) {
        return tidsperiodeUtil({ startdato, sluttdato }).antallUttaksdager();
    }
    return tidsperiodeUtil({ sluttdato, startdato }).antallUttaksdager();
};
