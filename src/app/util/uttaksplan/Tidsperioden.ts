import moment from 'moment';
import { Holiday } from 'date-holidays';
import { Tidsperiode } from 'common/types';
import { getOffentligeFridager } from 'common/util/fridagerUtils';
import { Uttaksdagen } from './Uttaksdagen';
import { InjectedIntl } from 'react-intl';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import getMessage from 'common/util/i18nUtils';

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
    setUttaksdager: (uttaksdager: number) => getTidsperiode(tidsperiode.fom, uttaksdager),
    formaterString: (intl: InjectedIntl) => tidsperiodeToString(tidsperiode, intl)
});

export function isValidTidsperiode(tidsperiode: any): tidsperiode is Tidsperiode {
    return tidsperiode.fom !== undefined && tidsperiode.tom !== undefined;
}

export function getValidTidsperiode(tidsperiode: Partial<Tidsperiode> | undefined): Tidsperiode | undefined {
    if (tidsperiode === undefined) {
        return undefined;
    }
    if (isValidTidsperiode(tidsperiode)) {
        return tidsperiode;
    }
    return undefined;
}

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
    return moment(d1).isSameOrBefore(d2, 'day');
}

export function erSammeEllerSenereDato(d1: Date, d2: Date) {
    return moment(d1).isSameOrAfter(d2, 'day');
}

/**
 * Summerer antall uttaksdager i angitt tidsperiode
 */
function getAntallUttaksdagerITidsperiode(tidsperiode: Tidsperiode, taBortFridager?: boolean): number {
    if (!tidsperiode.fom || !tidsperiode.tom) {
        return 0;
    }
    const fom = moment(tidsperiode.fom);
    const tom = moment(tidsperiode.tom);
    if (fom.isAfter(tom, 'day')) {
        return -1;
    }
    let antall = 0;
    let fridager = 0;
    while (fom.isSameOrBefore(tom, 'day')) {
        if (Uttaksdagen(fom.toDate()).erUttaksdag()) {
            antall++;
        }
        fom.add(1, 'day');
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
    return (
        moment(tidsperiode1.fom).isAfter(tidsperiode2.tom, 'day') ||
        moment(tidsperiode1.tom).isBefore(tidsperiode2.fom, 'day')
    );
}

function tidsperiodeToString(tidsperiode: Tidsperiode, intl: InjectedIntl) {
    return getMessage(intl, 'tidsperiode', {
        fom: formaterDatoUtenDag(tidsperiode.fom),
        tom: formaterDatoUtenDag(tidsperiode.tom)
    });
}
