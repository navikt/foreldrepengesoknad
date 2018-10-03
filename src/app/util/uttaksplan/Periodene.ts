import moment from 'moment';
import {
    Periode,
    Uttaksperiode,
    Periodetype,
    Utsettelsesperiode,
    Oppholdsperiode
} from '../../types/uttaksplan/periodetyper';
import { Tidsperiode } from 'common/types';

export const Periodene = (perioder: Periode[]) => ({
    getPeriode: (id: string) => getPeriode(perioder, id),
    getOpphold: () => getOpphold(perioder),
    getUttak: () => getUttaksperioder(perioder),
    getUtsettelser: () => getUtsettelser(perioder),
    finnOverlappendePerioder: (periode: Periode) => finnOverlappendePerioder(perioder, periode),
    sort: () => perioder.sort(sorterPerioder)
});

/**
 * Sorterer perioder ut fra startdato - asc
 * @param p1
 * @param p2
 */
export function sorterPerioder(p1: Periode, p2: Periode) {
    if (p1.tidsperiode.fom === undefined || p2.tidsperiode.fom === undefined) {
        return p1.tidsperiode.fom === undefined ? -1 : 1;
    }
    return moment(p1.tidsperiode.fom).isBefore(p2.tidsperiode.fom) ? -1 : 1;
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
 * Finner perioder som berører tidsperiode
 * @param perioder Alle perioder
 * @param tidsperiode
 */
function finnOverlappendePerioder(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => {
        if (p.id === periode.id) {
            return;
        }
        const { fom, tom } = p.tidsperiode;
        if (!fom || !tom) {
            return false;
        }
        return (
            datoErInnenforTidsperiode(fom, periode.tidsperiode) || datoErInnenforTidsperiode(tom, periode.tidsperiode)
        );
    });
}

function datoErInnenforTidsperiode(dato: Date, tidsperiode: Tidsperiode): boolean {
    const m = moment(dato);
    const { fom, tom } = tidsperiode;
    if (!fom || !tom) {
        return false;
    }
    return m.isSame(fom, 'day') || m.isSame(tom, 'day') || m.isBetween(fom, tom, 'days');
}
