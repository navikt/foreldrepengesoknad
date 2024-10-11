import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { dateToISOString, formatDate } from '../dateUtils';
import { TidsperiodenString } from './TidsperiodenString';

dayjs.extend(isoWeek);

const isoStringFormat = 'YYYY-MM-DD';

/**
 * Wrapper en dato med uttaksdager-funksjonalitet
 * @param dato
 */
export const UttaksdagenString = (dato: string) => ({
    erUttaksdag: (): boolean => erUttaksdagString(dato),
    forrige: (): string => getUttaksdagFørDato(dato),
    neste: (): string => getUttaksdagEtterDato(dato),
    denneEllerNeste: (): string => getUttaksdagFraOgMedDato(dato),
    denneEllerForrige: (): string => getUttaksdagTilOgMedDato(dato),
    getUttaksdagerFremTilDato: (tildato: string) => getUttaksdagerFremTilDato(dato, tildato),
    leggTil: (uttaksdager: number): string => {
        if (uttaksdager < 0) {
            return trekkUttaksdagerFraDato(dato, uttaksdager);
        } else if (uttaksdager > 0) {
            return leggUttaksdagerTilDato(dato, uttaksdager);
        }
        return dato;
    },
    trekkFra: (uttaksdager: number): string => trekkUttaksdagerFraDato(dato, uttaksdager),
});

function getUkedag(dato: Date | string): number {
    return dayjs(dato).isoWeekday();
}

export function erUttaksdagString(dato: Date | string): boolean {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
}

function getUttaksdagFørDato(dato: string): string {
    return getUttaksdagTilOgMedDato(dayjs.utc(dato).subtract(24, 'hours').format(isoStringFormat));
}

function getUttaksdagTilOgMedDato(dato: string): string {
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(dato).subtract(24, 'hours').startOf('day').format(isoStringFormat);
        case 7:
            return dayjs.utc(dato).subtract(48, 'hours').startOf('day').format(isoStringFormat);
        default:
            return dato;
    }
}
/**
 * Første gyldige uttaksdag etter dato
 * @param termin
 */
function getUttaksdagEtterDato(dato: string): string {
    return getUttaksdagFraOgMedDato(dayjs(dato).add(24, 'hours').format(isoStringFormat));
}

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den nærmeste påfølgende mandag
 * Tar hensyn til stilling av klokken ved å gjøre om klokka til kl 12 før antall timer legges til.
 * @param dato
 */
function getUttaksdagFraOgMedDato(dato: string): string {
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(dato).add(48, 'hours').startOf('day').format(isoStringFormat);
        case 7:
            return dayjs.utc(dato).add(24, 'hours').startOf('day').format(isoStringFormat);
        default:
            return dato;
    }
}

/**
 * Legger uttaksdager til en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
function leggUttaksdagerTilDato(dato: string, uttaksdager: number): string {
    if (erUttaksdagString(dato) === false) {
        throw new Error(`leggUttaksdagerTilDato: Dato ${formatDate(dato)} må være uttaksdag`);
    }
    let nyDato = new Date(dato);
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller <= uttaksdager) {
        const tellerdato = dayjs(dato)
            .add(dagteller++ * 24, 'hours')
            .toDate();
        if (erUttaksdagString(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return dateToISOString(nyDato);
}

/**
 * Trekker uttaksdager fra en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
function trekkUttaksdagerFraDato(dato: string, uttaksdager: number): string {
    if (erUttaksdagString(dato) === false) {
        throw new Error(`trekkUttaksdagerFraDato: Dato ${formatDate(dato)} må være uttaksdag`);
    }
    let nyDato = new Date(dato);
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller < Math.abs(uttaksdager)) {
        const tellerdato = dayjs(dato)
            .add(--dagteller * 24, 'hours')
            .toDate();
        if (erUttaksdagString(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return dateToISOString(nyDato);
}

/**
 * Finner antall uttaksdager som er mellom to datoer. Dvs. fra og med startdato, og
 * frem til sluttdato (ikke til og med)
 * @param fra
 * @param til
 */
function getUttaksdagerFremTilDato(fom: string, tom: string): number {
    if (dayjs(fom).isSame(tom, 'day')) {
        return 0;
    }
    if (dayjs(fom).isBefore(tom, 'day')) {
        return TidsperiodenString({ fom, tom }).getAntallUttaksdager() - 1;
    }
    return (
        -1 *
        (TidsperiodenString({
            fom: tom,
            tom: fom,
        }).getAntallUttaksdager() -
            1)
    );
}
