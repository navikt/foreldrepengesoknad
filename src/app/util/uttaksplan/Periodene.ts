import { isWithinRange, isBefore, isSameDay, isAfter } from 'date-fns';
import { guid } from 'nav-frontend-js-utils/lib';
import {
    Periode,
    StønadskontoType,
    Uttaksperiode,
    Periodetype,
    Utsettelsesperiode,
    Oppholdsperiode
} from '../../types/uttaksplan/periodetyper';
import { Uttaksdagen } from './Uttaksdagen';
import { Tidsperioden } from './Tidsperioden';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { Perioden } from './Perioden';

export const Periodene = (perioder: Periode[]) => ({
    getPeriode: (id: string) => getPeriode(perioder, id),
    getOpphold: () => getOpphold(perioder),
    getUttak: () => getUttaksperioder(perioder),
    getUtsettelser: () => getUtsettelser(perioder),
    getPeriodeMedSammeStartdato: (periode: Periode) => getPeriodeMedSammeStartdatoSomPeriode(perioder, periode),
    getAntallDagerUttak: (konto?: StønadskontoType) => getAntallDagerUttak(perioder, konto),
    getAntallDagerUtsatt: () => getAntallDagerUtsatt(perioder),
    getAntallDagerOpphold: () => getAntallDagerOpphold(perioder),
    getFørsteOgSisteRegistrerteUttaksdager: (inkludertOpphold: boolean = false) =>
        getFørsteOgSisteUttaksdag(perioder, inkludertOpphold),
    finnPeriodeMedDato: (dato: Date) => finnPeriodeMedDato(perioder, dato),
    finnPerioderFørDato: (dato: Date, ignorerPeriode?: Periode) => finnPerioderFørDato(perioder, dato, ignorerPeriode),
    finnPerioderPåEllerEtterDato: (dato: Date, ignorerPeriode?: Periode) =>
        finnPerioderPåEllerEtterDato(perioder, dato, ignorerPeriode),
    finnOverlappendePerioder: (periode: Periode) => finnOverlappendePerioder(perioder, periode.tidsperiode),
    finnAlleForegåendePerioder: (periode: Periode) => finnPerioderFørPeriode(perioder, periode),
    finnAllePåfølgendePerioder: (periode: Periode) => finnPerioderEtterPeriode(perioder, periode),
    finnDenForegåendePerioden: (periode: Periode) => finnForrigePeriode(perioder, periode),
    finnPåfølgendePeriode: (periode: Periode) => finnPåfølgendePeriode(perioder, periode),
    fjernPerioder: (fjernes: Periode[]) => fjernPerioder(perioder, fjernes),
    forskyvPerioder: (uttaksdager: number) => forskyvPerioder(perioder, uttaksdager),
    finnOppholdIPerioder: (): Periode[] => finnOppholdMellomPerioder(perioder),
    sort: () => perioder.sort(sorterPerioder)
});

/**
 * Sorterer perioder ut fra startdato - asc
 * @param p1
 * @param p2
 */
export function sorterPerioder(p1: Periode, p2: Periode) {
    return isBefore(p1.tidsperiode.fom, p2.tidsperiode.fom) ? -1 : 1;
}

function getPeriode(perioder: Periode[], id: string): Periode | undefined {
    return perioder.find((p) => p.id === id);
}

/**
 * Returnerer perioder som er uttaksperioder
 * @param perioder
 */
function getUttaksperioder(perioder: Periode[]): Uttaksperiode[] {
    return perioder.filter((periode) => periode.type === Periodetype.Uttak) as Uttaksperiode[];
}

/**
 * Returnerer perioder som er uttaksperioder
 * @param perioder
 */
function getUtsettelser(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter((periode) => periode.type === Periodetype.Utsettelse) as Utsettelsesperiode[];
}

/**
 * Returnerer perioder som er uttaksperioder
 * @param perioder
 */
function getOpphold(perioder: Periode[]): Oppholdsperiode[] {
    return perioder.filter((periode) => periode.type === Periodetype.Opphold) as Oppholdsperiode[];
}

/**
 * Finner periode som inneholder angitt dato
 * @param perioder
 * @param dato dato som periode skal inneholde
 */
function finnPeriodeMedDato(perioder: Periode[], dato: Date): Periode | undefined {
    return perioder.find((periode) => {
        return isWithinRange(dato, periode.tidsperiode.fom, periode.tidsperiode.tom);
    });
}

/**
 * Finner periode som inneholder angitt dato
 * @param perioder
 * @param dato dato som periode skal inneholde
 * @param ignorerPeriode periode som skal ekskluderes fra resultatet
 */
function finnPerioderPåEllerEtterDato(perioder: Periode[], dato: Date, ignorerPeriode?: Periode): Periode[] {
    return perioder.filter((periode) => {
        if (ignorerPeriode && periode.id === ignorerPeriode.id) {
            return false;
        }
        return isAfter(periode.tidsperiode.fom, dato) || isSameDay(periode.tidsperiode.fom, dato);
    });
}

/**
 * Finner periode som inneholder angitt dato
 * @param perioder
 * @param dato dato som periode skal inneholde
 * @param ignorerPeriode periode som skal ekskluderes fra resultatet
 */
function finnPerioderFørDato(perioder: Periode[], dato: Date, ignorerPeriode?: Periode): Periode[] {
    return perioder.filter((periode) => {
        if (ignorerPeriode && periode.id === ignorerPeriode.id) {
            return false;
        }
        return isBefore(periode.tidsperiode.tom, dato);
    });
}

/**
 * Finner perioder som berører tidsperiode
 * @param perioder Alle perioder
 * @param tidsperiode
 */
function finnOverlappendePerioder(perioder: Periode[], tidsperiode: Tidsperiode): Periode[] {
    return perioder.filter((periode) => {
        const { fom, tom } = periode.tidsperiode;
        return (
            (isBefore(fom, tidsperiode.tom) || isSameDay(fom, tidsperiode.tom)) &&
            (isAfter(tom, tidsperiode.fom) || isSameDay(tom, tidsperiode.fom))
        );
    });
}

/**
 * Forskyver en periode med uttaksdager
 * @param periode
 * @param uttaksdager
 */
function forskyvPeriode(periode: Periode, uttaksdager: number): Periode {
    return Perioden(periode).setStartdato(Uttaksdagen(periode.tidsperiode.fom).leggTil(uttaksdager));
}

/**
 * Forskyver perioder med uttaksdager
 * @param perioder
 * @param uttaksdager
 */
function forskyvPerioder(perioder: Periode[], uttaksdager: number): Periode[] {
    return perioder.map((periode) => {
        if (periode.type === Periodetype.Utsettelse) {
            return periode;
        }
        return forskyvPeriode(periode, uttaksdager);
    });
}

/**
 * Finner alle perioder før periode ut fra startdato
 * @param perioder
 * @param periode
 */
function finnPerioderFørPeriode(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => isBefore(p.tidsperiode.tom, periode.tidsperiode.fom));
}

/**
 * Finner perioden som ligger før denne i array, ikke ut fra dato
 * @param perioder
 * @param periode
 */

function finnForrigePeriode(perioder: Periode[], periode: Periode): Periode | undefined {
    const foregåendePerioder = finnPerioderFørPeriode(perioder, periode);
    if (foregåendePerioder.length > 0) {
        return foregåendePerioder.pop();
    }
    return undefined;
}

/**
 * Finner alle perioder etter periode ut fra startdato
 * @param perioder
 * @param periode
 */

function finnPerioderEtterPeriode(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => isAfter(p.tidsperiode.fom, periode.tidsperiode.tom));
}

/**
 * Finner påfølgende enkelt-periode
 * @param perioder
 * @param periode
 */
function finnPåfølgendePeriode(perioder: Periode[], periode: Periode): Periode | undefined {
    const påfølgendePerioder = finnPerioderEtterPeriode(perioder, periode);
    if (påfølgendePerioder.length > 0) {
        return påfølgendePerioder[0];
    }
    return undefined;
}

/**
 * Summerer opp antall uttaksdager i perioder, og evt. for gitt StønadstypeKonto
 * @param perioder
 * @param konto
 */
function getAntallDagerUttak(perioder: Periode[], konto?: StønadskontoType): number {
    const uttaksperioder = Periodene(perioder).getUttak();
    return uttaksperioder.reduce((dager: number, periode: Uttaksperiode) => {
        if (konto === undefined || periode.konto === konto) {
            return dager + Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
        }
        return dager;
    }, 0);
}

/**
 * Summerer opp antall uttaksdager i perioder, og evt. for gitt StønadstypeKonto
 * @param perioder
 * @param konto
 */
function getAntallDagerUtsatt(perioder: Periode[]): number {
    return getUtsettelser(perioder).reduce((dager: number, periode: Utsettelsesperiode) => {
        return dager + Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    }, 0);
}

/**
 * Summerer opp antall uttaksdager i perioder, og evt. for gitt StønadstypeKonto
 * @param perioder
 * @param konto
 */
function getAntallDagerOpphold(perioder: Periode[]): number {
    return getOpphold(perioder).reduce((dager: number, periode: Oppholdsperiode) => {
        return dager + Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    }, 0);
}

/**
 * Fjerner perioder fra perioder
 * @param perioder
 * @param fjernes
 */
function fjernPerioder(perioder: Periode[], fjernes: Periode[]) {
    return perioder.filter((p) => (fjernes.findIndex((f) => p.id === f.id) >= 0 ? false : true));
}

function getPeriodeMedSammeStartdatoSomPeriode(perioder: Periode[], periode: Periode) {
    return perioder.find((p) => p.id !== periode.id && isSameDay(p.tidsperiode.fom, periode.tidsperiode.fom));
}

/**
 * Går gjennom alle perioder og finner uttaksdager som
 * ikke tilhører en periode. Oppretter Opphold for disse
 * @param perioder
 */
function finnOppholdMellomPerioder(perioder: Periode[]): Oppholdsperiode[] {
    const opphold: Oppholdsperiode[] = [];
    const len = perioder.length;
    perioder.forEach((periode, idx) => {
        if (idx === len - 1) {
            return;
        }
        const nestePeriode = perioder[idx + 1];

        const tidsperiodeMellomPerioder: Tidsperiode = {
            fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
            tom: Uttaksdagen(nestePeriode.tidsperiode.fom).forrige()
        };
        if (isBefore(tidsperiodeMellomPerioder.tom, tidsperiodeMellomPerioder.fom)) {
            return;
        }

        const uttaksdagerITidsperiode = Tidsperioden(tidsperiodeMellomPerioder).getAntallUttaksdager();
        if (uttaksdagerITidsperiode > 0) {
            opphold.push({
                id: guid(),
                type: Periodetype.Opphold,
                tidsperiode: tidsperiodeMellomPerioder
            });
        }
    });
    return opphold;
}

function getFørsteOgSisteUttaksdag(perioder: Periode[], inkludertOpphold: boolean): Tidsperiode | undefined {
    const filtrertePerioder = inkludertOpphold ? perioder : perioder.filter((p2) => p2.type !== Periodetype.Opphold);

    if (filtrertePerioder.length === 0) {
        return undefined;
    }
    let fom: Date = filtrertePerioder[0].tidsperiode.fom;
    let tom: Date = filtrertePerioder[1].tidsperiode.tom;

    filtrertePerioder.forEach((p) => {
        if (isBefore(p.tidsperiode.fom, fom)) {
            fom = p.tidsperiode.fom;
        }
        if (isAfter(p.tidsperiode.tom, tom)) {
            tom = p.tidsperiode.tom;
        }
    });

    return {
        fom,
        tom
    };
}
