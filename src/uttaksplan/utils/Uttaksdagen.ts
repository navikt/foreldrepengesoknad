import { addDays, getISODay, isSameDay, isBefore } from 'date-fns';
import { Tidsperioden } from 'uttaksplan/utils';

/**
 * Wrapper en dato med uttaksdager-funksjonalitet
 * @param dato
 */
export const Uttaksdagen = (dato: Date) => ({
    erUttaksdag: (): boolean => erUttaksdag(dato),
    forrige: (): Date => getUttaksdagFørDato(dato),
    neste: (): Date => getUttaksdagEtterDato(dato),
    denneEllerNeste: (): Date => getUttaksdagFraOgMedDato(dato),
    denneEllerForrige: (): Date => getUttaksdagTilOgMedDato(dato),
    getUttaksdagerFremTilDato: (tildato: Date) =>
        getUttaksdagerFremTilDato(dato, tildato),
    leggTil: (uttaksdager: number): Date => {
        if (uttaksdager < 0) {
            return trekkUttaksdagerFraDato(dato, uttaksdager);
        } else if (uttaksdager > 0) {
            return leggUttaksdagerTilDato(dato, uttaksdager);
        }
        return dato;
    },
    trekkFra: (uttaksdager: number): Date =>
        trekkUttaksdagerFraDato(dato, uttaksdager)
});

/**
 * Returnerer
 * @param dato
 */
function getUkedag(dato: Date) {
    return getISODay(dato);
}

/**
 * Returnerer om en dato er en uttaksdag
 * @param dato
 */
function erUttaksdag(dato: Date): boolean {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
}

/**
 * Finner første uttaksdag før dato
 * @param dato
 */
function getUttaksdagFørDato(dato: Date): Date {
    return getUttaksdagTilOgMedDato(addDays(dato, -1));
}

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den foregående fredag
 * @param dato
 */
function getUttaksdagTilOgMedDato(dato: Date): Date {
    switch (getUkedag(dato)) {
        case 6:
            return addDays(dato, -1);
        case 7:
            return addDays(dato, -2);
        default:
            return dato;
    }
}

/**
 * Første gyldige uttaksdag etter dato
 * @param termin
 */
function getUttaksdagEtterDato(dato: Date): Date {
    return getUttaksdagFraOgMedDato(addDays(dato, 1));
}

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den nærmeste påfølgende mandag
 * @param dato
 */
function getUttaksdagFraOgMedDato(dato: Date): Date {
    switch (getUkedag(dato)) {
        case 6:
            return addDays(dato, 2);
        case 7:
            return addDays(dato, 1);
        default:
            return dato;
    }
}

/**
 * Legger uttaksdager til en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
function leggUttaksdagerTilDato(dato: Date, uttaksdager: number): Date {
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
}

/**
 * Trekker uttaksdager fra en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
function trekkUttaksdagerFraDato(dato: Date, uttaksdager: number): Date {
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
}

/**
 * Finner antall uttaksdager som er mellom to datoer. Dvs. fra og med startdato, og
 * frem til sluttdato (ikke til og med)
 * @param fra
 * @param til
 */
function getUttaksdagerFremTilDato(startdato: Date, sluttdato: Date): number {
    if (isSameDay(startdato, sluttdato)) {
        return 0;
    }
    if (isBefore(startdato, sluttdato)) {
        return (
            Tidsperioden({ startdato, sluttdato }).getAntallUttaksdager() - 1
        );
    }
    return (
        -1 *
        (Tidsperioden({
            startdato: sluttdato,
            sluttdato: startdato
        }).getAntallUttaksdager() -
            1)
    );
}
