import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { formatDate } from '../dateUtils';
import { TidsperiodenString } from './TidsperiodenString';

dayjs.extend(isoWeek);

const isoStringFormat = 'YYYY-MM-DD';

export class UttaksdagenString {
    private readonly uttaksdagenDato: string;

    private constructor(uttaksdagenDato: string) {
        this.uttaksdagenDato = uttaksdagenDato;
    }

    static forArbeidsdagen(dato: string): UttaksdagenString {
        if (erUttaksdag(dato) === false) {
            throw new Error(`Dato ${formatDate(dato)} må være uttaksdag`);
        }
        return new UttaksdagenString(dato);
    }

    static forDenneEllerForrige(dato: string): UttaksdagenString {
        return new UttaksdagenString(getUttaksdagTilOgMedDato(dato));
    }

    static forDenneEllerNeste(dato: string): UttaksdagenString {
        return new UttaksdagenString(getUttaksdagFraOgMedDato(dato));
    }

    static forForrige(dato: string): UttaksdagenString {
        return new UttaksdagenString(getUttaksdagFørDato(dato));
    }

    static forNeste(dato: string): UttaksdagenString {
        return new UttaksdagenString(getUttaksdagEtterDato(dato));
    }

    getDatoAntallUttaksdagerSenere(uttaksdager: number): string {
        return leggUttaksdagerTilDato(this.uttaksdagenDato, uttaksdager);
    }

    getDatoAntallUttaksdagerTidligere(uttaksdager: number): string {
        return trekkUttaksdagerFraDato(this.uttaksdagenDato, uttaksdager);
    }

    getUttaksdagerFremTilDato(tilDato: string): number {
        return getUttaksdagerFremTilDato(this.uttaksdagenDato, tilDato);
    }

    getDato(): string {
        return this.uttaksdagenDato;
    }
}

export const erUttaksdag = (dato: string): boolean => {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
};

const getUkedag = (dato: Date | string): number => {
    return dayjs(dato).isoWeekday();
};

const getUttaksdagFørDato = (dato: string): string => {
    return getUttaksdagTilOgMedDato(dayjs.utc(dato).subtract(24, 'hours').format(isoStringFormat));
};

const getUttaksdagTilOgMedDato = (dato: string): string => {
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(dato).subtract(24, 'hours').startOf('day').format(isoStringFormat);
        case 7:
            return dayjs.utc(dato).subtract(48, 'hours').startOf('day').format(isoStringFormat);
        default:
            return dato;
    }
};
/**
 * Første gyldige uttaksdag etter dato
 */
const getUttaksdagEtterDato = (dato: string): string => {
    return getUttaksdagFraOgMedDato(dayjs(dato).add(24, 'hours').format(isoStringFormat));
};

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den nærmeste påfølgende mandag
 * Tar hensyn til stilling av klokken ved å gjøre om klokka til kl 12 før antall timer legges til.
 */
const getUttaksdagFraOgMedDato = (dato: string): string => {
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(dato).add(48, 'hours').startOf('day').format(isoStringFormat);
        case 7:
            return dayjs.utc(dato).add(24, 'hours').startOf('day').format(isoStringFormat);
        default:
            return dato;
    }
};

/**
 * Legger uttaksdager til en dato og returnerer ny dato
 */
const leggUttaksdagerTilDato = (dato: string, uttaksdager: number): string => {
    let nyDato = dayjs(dato);
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller <= uttaksdager) {
        const tellerdato = dayjs(dato).add(dagteller++ * 24, 'hours');
        if (erUttaksdag(tellerdato.format(ISO_DATE_FORMAT))) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato.format(ISO_DATE_FORMAT);
};

/**
 * Trekker uttaksdager fra en dato og returnerer ny dato
 */
const trekkUttaksdagerFraDato = (dato: string, uttaksdager: number): string => {
    let nyDato = dayjs(dato);
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller < Math.abs(uttaksdager)) {
        const tellerdato = dayjs(dato).add(--dagteller * 24, 'hours');
        if (erUttaksdag(tellerdato.format(ISO_DATE_FORMAT))) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato.format(ISO_DATE_FORMAT);
};

/**
 * Finner antall uttaksdager som er mellom to datoer. Dvs. fra og med startdato, og
 * frem til sluttdato (ikke til og med)
 */
const getUttaksdagerFremTilDato = (fom: string, tom: string): number => {
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
};
