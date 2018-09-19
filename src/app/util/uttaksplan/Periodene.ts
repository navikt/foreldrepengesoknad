import moment from 'moment';
import {
    Periode,
    Uttaksperiode,
    Periodetype,
    Utsettelsesperiode,
    Oppholdsperiode
} from '../../types/uttaksplan/periodetyper';

export const Periodene = (perioder: Periode[]) => ({
    getPeriode: (id: string) => getPeriode(perioder, id),
    getOpphold: () => getOpphold(perioder),
    getUttak: () => getUttaksperioder(perioder),
    getUtsettelser: () => getUtsettelser(perioder),
    sort: () => perioder.sort(sorterPerioder)
});

/**
 * Sorterer perioder ut fra startdato - asc
 * @param p1
 * @param p2
 */
export function sorterPerioder(p1: Periode, p2: Periode) {
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
