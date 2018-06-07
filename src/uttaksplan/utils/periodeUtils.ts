import { isWithinRange, isBefore, isSameDay, isAfter } from 'date-fns';
import {
    Periode,
    Uttaksperiode,
    Utsettelsesperiode,
    Tidsperiode,
    Periodetype
} from '../types';
import { uttaksdag, uttakTidsperiode } from './uttaksdagerUtils';

/**
 * Sorterer perioder ut fra startdato - asc
 * @param p1
 * @param p2
 */
export function sorterPerioder(p1: Periode, p2: Periode) {
    return p1.tidsperiode.startdato >= p2.tidsperiode.startdato ? 1 : -1;
}

/**
 * Returnerer perioder som er uttaksperioder
 * @param perioder
 */
export function getUttaksperioder(perioder: Periode[]): Uttaksperiode[] {
    return perioder.filter(
        (periode) => periode.type === Periodetype.Uttak
    ) as Uttaksperiode[];
}

/**
 * Returnerer perioder som er uttaksperioder
 * @param perioder
 */
export function getUtsettelser(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter(
        (periode) => periode.type === Periodetype.Utsettelse
    ) as Utsettelsesperiode[];
}

/**
 * Returnerer perioder som er uttaksperioder eller utsettelser
 * @param perioder
 */
export function getUttakOgUtsettelser(
    perioder: Periode[]
): Array<Uttaksperiode | Utsettelsesperiode> {
    return perioder.filter(
        (periode) =>
            periode.type === Periodetype.Utsettelse ||
            periode.type === Periodetype.Uttak
    ) as Utsettelsesperiode[];
}

/**
 * Finner periode som inneholder angitt dato
 * @param perioder
 * @param dato dato som periode skal inneholde
 */
export function finnPeriodeMedDato(
    perioder: Periode[],
    dato: Date
): Periode | undefined {
    return perioder.find((periode) => {
        return isWithinRange(
            dato,
            periode.tidsperiode.startdato,
            periode.tidsperiode.sluttdato
        );
    });
}

/**
 * Finner perioder som berører tidsperiode
 * @param perioder Alle perioder
 * @param tidsperiode
 */
export function finnPerioderITidsrom(
    perioder: Periode[],
    tidsperiode: Tidsperiode
): Periode[] {
    return perioder.filter((periode) => {
        return (
            isWithinRange(
                periode.tidsperiode.startdato,
                tidsperiode.startdato,
                tidsperiode.sluttdato
            ) ||
            isWithinRange(
                periode.tidsperiode.sluttdato,
                tidsperiode.startdato,
                tidsperiode.sluttdato
            )
        );
    });
}

/**
 * Flytter en periode til ny startdato
 * @param periode
 * @param startdato
 */
export function flyttPeriode(periode: Periode, dager: number): Periode {
    const { tidsperiode } = periode;
    const uttaksdager = uttakTidsperiode(tidsperiode).antallUttaksdager();
    const startdato = uttaksdag(tidsperiode.startdato).leggTil(dager);
    return {
        ...periode,
        tidsperiode: {
            startdato,
            sluttdato: uttaksdag(startdato).periodeslutt(uttaksdager)
        }
    };
}

/**
 * Forskyver alle perioder ut fra ny startdato
 * @param perioder
 * @param startdato
 */
export function forskyvPerioder(
    perioder: Periode[],
    uttaksdager: number
): Periode[] {
    return perioder.map((periode) => {
        if (periode.type === Periodetype.Utsettelse) {
            return periode;
        }
        return flyttPeriode(periode, uttaksdager);
    });
}

/**
 * Finner aller perioder før en gitt periode
 * @param perioder
 * @param periode
 */

export function finnPerioderFørPeriode(
    perioder: Periode[],
    periode: Periode
): Periode[] {
    return perioder.filter((p) =>
        isBefore(p.tidsperiode.sluttdato, periode.tidsperiode.startdato)
    );
}

/**
 * Finner aller perioder etter en gitt periode
 * @param perioder
 * @param periode
 */

export function finnPerioderEtterPeriode(
    perioder: Periode[],
    periode: Periode
): Periode[] {
    return perioder.filter((p) =>
        isAfter(p.tidsperiode.startdato, periode.tidsperiode.sluttdato)
    );
}

/**
 * Sjekker om to perioder er kan slåes sammen til en periode
 * @param p1 periode 1
 * @param p2 periode 2
 */
export function erPerioderLike(p1: Periode, p2: Periode) {
    if (p1.type !== Periodetype.Uttak || p2.type !== Periodetype.Uttak) {
        return false;
    }
    const getPeriodeFootprint = (periode: Uttaksperiode) =>
        `${periode.type}${periode.forelder}${periode.konto}${
            periode.låstPeriode
        }${periode.låstForelder}`;
    const k1 = getPeriodeFootprint(p1);
    const k2 = getPeriodeFootprint(p2);
    return k1 === k2;
}

/**
 * Sjekker om to perioder er sammenhengende/dvs. det er ingen
 * uttaksdager mellom dem
 * @param p1
 * @param p2
 */
export function erPerioderSammenhengende(p1: Periode, p2: Periode) {
    const p1NesteUttaksdato = uttaksdag(p1.tidsperiode.sluttdato).neste();
    const p2Startdato = p2.tidsperiode.startdato;
    return isSameDay(p1NesteUttaksdato, p2Startdato);
}
