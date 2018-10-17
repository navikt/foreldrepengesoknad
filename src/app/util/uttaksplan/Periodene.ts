import moment from 'moment';
import {
    Periode,
    Uttaksperiode,
    Periodetype,
    Utsettelsesperiode,
    Oppholdsperiode,
    PeriodeHull,
    isForeldrepengerFørFødselUttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { Tidsperiode } from 'common/types';
import { Perioden } from './Perioden';
import { Uttaksdagen } from './Uttaksdagen';

export const Periodene = (perioder: Periode[]) => ({
    getPeriode: (id: string) => getPeriode(perioder, id),
    getOpphold: () => getOpphold(perioder),
    getUttak: () => getUttaksperioder(perioder),
    getHull: () => getHull(perioder),
    getUtsettelser: () => getUtsettelser(perioder),
    getPerioderEtterFamiliehendelsesdato: (dato: Date) => getPerioderEtterFamiliehendelsesdato(perioder, dato),
    getPerioderFørFamiliehendelsesdato: (dato: Date) => getPerioderFørFamiliehendelsesdato(perioder, dato),
    finnOverlappendePerioder: (periode: Periode) => finnOverlappendePerioder(perioder, periode),
    sort: () => perioder.sort(sorterPerioder),
    finnPeriodeMedDato: (dato: Date) => finnPeriodeMedDato(perioder, dato),
    finnAlleForegåendePerioder: (periode: Periode) => finnPerioderFørPeriode(perioder, periode),
    finnAllePåfølgendePerioder: (periode: Periode) => finnPerioderEtterPeriode(perioder, periode),
    finnDenForegåendePerioden: (periode: Periode) => finnForrigePeriode(perioder, periode),
    finnPåfølgendePeriode: (periode: Periode) => finnPåfølgendePeriode(perioder, periode),
    forskyvPerioder: (uttaksdager: number) => forskyvPerioder(perioder, uttaksdager)
});

export function sorterPerioder(p1: Periode, p2: Periode) {
    if (p1.tidsperiode.fom === undefined || p2.tidsperiode.fom === undefined) {
        return p1.tidsperiode.fom === undefined ? -1 : 1;
    }
    return moment(p1.tidsperiode.fom).isBefore(p2.tidsperiode.fom, 'day') ? -1 : 1;
}

function getPeriode(perioder: Periode[], id: string): Periode | undefined {
    return perioder.find((p) => p.id === id);
}

function getUttaksperioder(perioder: Periode[]): Uttaksperiode[] {
    return perioder.filter((periode) => periode.type === Periodetype.Uttak) as Uttaksperiode[];
}

function getUtsettelser(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter((periode) => periode.type === Periodetype.Utsettelse) as Utsettelsesperiode[];
}

function getHull(perioder: Periode[]): PeriodeHull[] {
    return perioder.filter((periode) => periode.type === Periodetype.Hull) as PeriodeHull[];
}

function getOpphold(perioder: Periode[]): Oppholdsperiode[] {
    return perioder.filter((periode) => periode.type === Periodetype.Opphold) as Oppholdsperiode[];
}

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
    const { fom, tom } = tidsperiode;
    if (!fom || !tom) {
        return false;
    }
    return moment(dato).isBetween(fom, tom, 'days', '[]');
}

function finnPeriodeMedDato(perioder: Periode[], dato: Date): Periode | undefined {
    return perioder.find((periode) => {
        return moment(dato).isBetween(periode.tidsperiode.fom, periode.tidsperiode.tom, 'day', '[]');
    });
}

function finnPerioderFørPeriode(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => moment(p.tidsperiode.tom).isBefore(periode.tidsperiode.fom, 'day'));
}

function finnPerioderEtterPeriode(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => moment(p.tidsperiode.fom).isAfter(periode.tidsperiode.tom, 'day'));
}

function finnForrigePeriode(perioder: Periode[], periode: Periode): Periode | undefined {
    const foregåendePerioder = finnPerioderFørPeriode(perioder, periode);
    if (foregåendePerioder.length > 0) {
        return foregåendePerioder.pop();
    }
    return undefined;
}
function finnPåfølgendePeriode(perioder: Periode[], periode: Periode): Periode | undefined {
    const påfølgendePerioder = finnPerioderEtterPeriode(perioder, periode);
    if (påfølgendePerioder.length > 0) {
        return påfølgendePerioder[0];
    }
    return undefined;
}
function forskyvPerioder(perioder: Periode[], uttaksdager: number): Periode[] {
    return perioder.map((periode) => {
        if (periode.type === Periodetype.Utsettelse) {
            return periode;
        }
        return forskyvPeriode(periode, uttaksdager);
    });
}

function forskyvPeriode(periode: Periode, uttaksdager: number): Periode {
    return Perioden(periode).setStartdato(Uttaksdagen(periode.tidsperiode.fom).leggTil(uttaksdager));
}

function getPerioderFørFamiliehendelsesdato(perioder: Periode[], familiehendelsesdato: Date) {
    return perioder.filter(
        (periode) =>
            moment(periode.tidsperiode.fom).isBefore(familiehendelsesdato, 'day') ||
            isForeldrepengerFørFødselUttaksperiode(periode)
    );
}

function getPerioderEtterFamiliehendelsesdato(perioder: Periode[], familiehendelsesdato: Date) {
    return perioder.filter(
        (periode) =>
            moment(periode.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'day') &&
            isForeldrepengerFørFødselUttaksperiode(periode) === false
    );
}
