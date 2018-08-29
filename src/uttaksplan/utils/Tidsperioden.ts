import { Holiday } from 'date-holidays';
import { Tidsperiode } from 'common/types';
import { Uttaksdagen } from 'uttaksplan/utils';
import { getOffentligeFridager } from 'common/util/fridagerUtils';
import { isSameDay, isAfter, isBefore } from 'date-fns';

/**
 * Wrapper en Tidsperiode med uttaksdager-funksjonalitet
 * @param dato
 */

export const Tidsperioden = (tidsperiode: Tidsperiode) => ({
    erLik: (tidsperiode2: Tidsperiode) => erTidsperioderLike(tidsperiode, tidsperiode2),
    erOmsluttetAv: (tidsperiode2: Tidsperiode) => erTidsperiodeOmsluttetAvTidsperiode(tidsperiode, tidsperiode2),
    erUtenfor: (tidsperiode2: Tidsperiode) => erTidsperiodeUtenforTidsperiode(tidsperiode, tidsperiode2),
    getAntallUttaksdager: (taBortFridager?: boolean) => getAntallUttaksdagerITidsperiode(tidsperiode, taBortFridager),
    getAntallFridager: () => getUttaksdagerSomErFridager(tidsperiode).length,
    setStartdato: (fom: Date) => flyttTidsperiode(tidsperiode, fom),
    setUttaksdager: (uttaksdager: number) => getTidsperiode(tidsperiode.fom, uttaksdager)
});

/**
 * Returnerer ny Tidsperiode gitt gyldig uttaksdag-fom og antall uttaksdager
 * @param fom
 * @param uttaksdager
 */
export function getTidsperiode(fom: Date, uttaksdager: number): Tidsperiode {
    if (!Uttaksdagen(fom).erUttaksdag()) {
        throw new Error('FOM er ikke en uttaksdag');
    }
    return {
        fom,
        tom: Uttaksdagen(fom).leggTil(uttaksdager - 1)
    };
}

/**
 * Summerer antall uttaksdager som er i en eller flere perioder
 * @param tidsperioder
 */
export function getAntallUttaksdagerITidsperioder(tidsperioder: Tidsperiode[], taBortFridager?: boolean): number {
    return tidsperioder.reduce(
        (dager: number, tidsperiode: Tidsperiode) =>
            dager + getAntallUttaksdagerITidsperiode(tidsperiode, taBortFridager),
        0
    );
}

export function erSammeEllerTidligereDato(d1: Date, d2: Date) {
    return isSameDay(d1, d2) || isBefore(d1, d2);
}

export function erSammeEllerSenereDato(d1: Date, d2: Date) {
    return isSameDay(d1, d2) || isAfter(d1, d2);
}

/**
 * Summerer antall uttaksdager i angitt tidsperiode
 */
function getAntallUttaksdagerITidsperiode(tidsperiode: Tidsperiode, taBortFridager?: boolean): number {
    if (tidsperiode.fom > tidsperiode.tom) {
        return -1;
    }
    const fom = new Date(tidsperiode.fom.getTime());
    const tom = new Date(tidsperiode.tom.getTime());
    let antall = 0;
    let fridager = 0;
    while (fom <= tom) {
        if (Uttaksdagen(fom).erUttaksdag()) {
            antall++;
        }
        fom.setDate(fom.getDate() + 1);
    }
    if (taBortFridager) {
        fridager = getUttaksdagerSomErFridager(tidsperiode).length;
    }
    return antall - fridager;
}

/**
 * Finner uttaksdager som er offentlig fridag
 */
function getUttaksdagerSomErFridager(tidsperiode: Tidsperiode): Holiday[] {
    return getOffentligeFridager(tidsperiode).filter((dag) => Uttaksdagen(dag.date).erUttaksdag());
}

/**
 * Setter ny startdato og flytter sluttdato slik at antall
 * uttaksdager blir det samme
 * @param tidsperiode
 * @param fom
 */
function flyttTidsperiode(tidsperiode: Tidsperiode, fom: Date): Tidsperiode {
    const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
    return getTidsperiode(fom, uttaksdager);
}

/**
 * Sjekker om to tidsperioder har samme start- og sluttdato
 * @param t1 Sjekker
 * @param t2
 */
function erTidsperioderLike(t1: Tidsperiode, t2: Tidsperiode) {
    return JSON.stringify(t1) === JSON.stringify(t2);
}

/**
 * Sjekker om tidsperiode1 er inne i tidsperiode2
 * @param tidsperiode1
 * @param tidsperiode2
 */
function erTidsperiodeOmsluttetAvTidsperiode(tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean {
    return (
        erSammeEllerSenereDato(tidsperiode1.fom, tidsperiode2.fom) &&
        erSammeEllerTidligereDato(tidsperiode1.tom, tidsperiode2.tom)
    );
}

/**
 * Sjekker om tidsperiode1 er helt utenfor tidsperiode2
 * @param tidsperiode1
 * @param tidsperiode2
 */
function erTidsperiodeUtenforTidsperiode(tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean {
    return isAfter(tidsperiode1.fom, tidsperiode2.tom) || isBefore(tidsperiode1.tom, tidsperiode2.fom);
}
