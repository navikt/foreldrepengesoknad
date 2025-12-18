import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import {
    TidsperiodenString,
    UttaksdagenString,
    datoErInnenforTidsperiodeString,
    isValidTidsperiodeString,
} from '@navikt/fp-utils';

import { Planperiode } from '../types/Planperiode';
import { Perioden } from './Perioden';
import {
    getTidsperiodeFromPlanperiode,
    isForeldrepengerFørFødselPeriode,
    isHull,
    isOppholdsperiode,
    isOverføringsperiode,
    isPeriodeUtenUttak,
    isUtsettelsesperiode,
    isUttaksperiode,
} from './periodeUtils';

dayjs.extend(isSameOrBefore);

export const Periodene = (perioder: Planperiode[]) => ({
    getPeriode: (id: string) => getPeriode(perioder, id),
    getOpphold: () => getOpphold(perioder),
    getUttak: () => getUttaksperioder(perioder),
    getOverføringer: () => getOverføringer(perioder),
    getHull: () => getHull(perioder),
    getHullOgInfoOgPerioderUtenUttak: () => getHullOgInfoOgPerioderUtenUttak(perioder),
    getUtsettelser: () => getUtsettelser(perioder),
    getPerioderEtterFamiliehendelsesdato: (dato: Date | string) => getPerioderEtterFamiliehendelsesdato(perioder, dato),
    getPerioderFørFamiliehendelsesdato: (dato: Date | string) => getPerioderFørFamiliehendelsesdato(perioder, dato),
    getPerioderMedUgyldigTidsperiode: () => getPeriodeMedUgyldigTidsperiode(perioder),
    getFørstePerioderEtterFamiliehendelsesdato: (dato: Date) =>
        getFørstePeriodeEtterFamiliehendelsesdato(perioder, dato),
    getForeldrepengerFørTermin: () => getForeldrepengerFørTermin(perioder),
    getFørsteUttaksdag: () => getFørsteUttaksdag(perioder),
    getFørsteUttaksdagEtterSistePeriode: () => getFørsteUttaksdagEtterSistePeriode(perioder),
    getFørsteUttaksdagEksluderInfoperioderOgFrittUttak: () =>
        getFørsteUttaksdagEksluderInfoperioderOgFrittUttak(perioder),
    getAntallUttaksdager: () => getAntallUttaksdager(perioder),
    finnOverlappendePerioder: (periode: Planperiode) => finnOverlappendePerioder(perioder, periode),
    finnPeriodeMedDato: (dato: Date) => finnPeriodeMedDato(perioder, dato),
    finnFørstePeriodeEtterDato: (dato: Date) => finnFørstePeriodeEtterDato(perioder, dato),
    finnAlleForegåendePerioder: (periode: Planperiode) => finnPerioderFørPeriode(perioder, periode),
    finnAllePåfølgendePerioder: (periode: Planperiode) => finnPerioderEtterPeriode(perioder, periode),
    finnDenForegåendePerioden: (periode: Planperiode) => finnForrigePeriode(perioder, periode),
    finnPåfølgendePeriode: (periode: Planperiode) => finnPåfølgendePeriode(perioder, periode),
    forskyvPerioder: (uttaksdager: number) => forskyvPerioder(perioder, uttaksdager),
    sort: () => [...perioder].sort(sorterPerioder),
});

export function sorterPerioder(p1: Planperiode, p2: Planperiode) {
    const tidsperiodeP1 = getTidsperiodeFromPlanperiode(p1);
    const tidsperiodeP2 = getTidsperiodeFromPlanperiode(p2);

    if (isValidTidsperiodeString(tidsperiodeP1) === false || isValidTidsperiodeString(tidsperiodeP2) === false) {
        if (isForeldrepengerFørFødselPeriode(p1) && p1.skalIkkeHaUttakFørTermin) {
            return -1;
        }
        return isValidTidsperiodeString(tidsperiodeP1) ? 1 : -1;
    }

    if (TidsperiodenString(tidsperiodeP2).erOmsluttetAv(tidsperiodeP1)) {
        return 1;
    }

    return dayjs(tidsperiodeP1.fom).isBefore(tidsperiodeP2.fom, 'day') ? -1 : 1;
}

function getPeriode(perioder: Planperiode[], id: string): Planperiode | undefined {
    return perioder.find((p) => p.id === id);
}

function getUttaksperioder(perioder: Planperiode[]) {
    return perioder.filter((periode) => isUttaksperiode(periode));
}

function getUtsettelser(perioder: Planperiode[]) {
    return perioder.filter((periode) => isUtsettelsesperiode(periode));
}

function getOverføringer(perioder: Planperiode[]) {
    return perioder.filter((periode) => isOverføringsperiode(periode));
}

function getHull(perioder: Planperiode[]): Planperiode[] {
    return perioder.filter((periode) => isHull(periode));
}

function getHullOgInfoOgPerioderUtenUttak(perioder: Planperiode[]) {
    return perioder.filter((periode) => isHull(periode) || isPeriodeUtenUttak(periode));
}

function getOpphold(perioder: Planperiode[]) {
    return perioder.filter((periode) => isOppholdsperiode(periode));
}

function finnOverlappendePerioder(perioder: Planperiode[], periode: Planperiode): Planperiode[] {
    return perioder.filter((p) => {
        if (p.id === periode.id || !isValidTidsperiodeString({ fom: periode.fom, tom: periode.tom })) {
            return false;
        }
        const { fom, tom } = p;
        if (!fom || !tom) {
            return false;
        }
        const fomEllerTomErInnenforTidsperiode =
            datoErInnenforTidsperiodeString(fom, { fom: periode.fom, tom: periode.tom }) ||
            datoErInnenforTidsperiodeString(tom, { fom: periode.fom, tom: periode.tom });

        const fomTomOmkranserTidsperiode =
            dayjs(periode.fom).isSameOrAfter(fom, 'day') && dayjs(periode.tom).isSameOrBefore(tom, 'day');

        return fomEllerTomErInnenforTidsperiode || fomTomOmkranserTidsperiode;
    });
}

function finnPeriodeMedDato(perioder: Planperiode[], dato: Date): Planperiode | undefined {
    return perioder.find((periode) => {
        return dayjs(dato).isBetween(periode.fom, periode.tom, 'day', '[]');
    });
}

function finnFørstePeriodeEtterDato(perioder: Planperiode[], dato: Date): Planperiode | undefined {
    return perioder.find((periode) => {
        return dayjs(periode.fom).isAfter(dato, 'day');
    });
}

function finnPerioderFørPeriode(perioder: Planperiode[], periode: Planperiode): Planperiode[] {
    return perioder.filter((p) => dayjs(p.tom).isBefore(periode.fom, 'day'));
}

function finnPerioderEtterPeriode(perioder: Planperiode[], periode: Planperiode): Planperiode[] {
    return perioder.filter((p) => dayjs(p.fom).isAfter(periode.tom, 'day'));
}

function finnForrigePeriode(perioder: Planperiode[], periode: Planperiode): Planperiode | undefined {
    const foregåendePerioder = finnPerioderFørPeriode(perioder, periode);
    if (foregåendePerioder.length > 0) {
        return foregåendePerioder.pop();
    }
    return undefined;
}
function finnPåfølgendePeriode(perioder: Planperiode[], periode: Planperiode): Planperiode | undefined {
    const påfølgendePerioder = finnPerioderEtterPeriode(perioder, periode);
    if (påfølgendePerioder.length > 0) {
        return påfølgendePerioder[0];
    }
    return undefined;
}
function forskyvPerioder(perioder: Planperiode[], uttaksdager: number): Planperiode[] {
    let uttaksdagerCurrent = uttaksdager;

    return perioder.reduce((result: Planperiode[], periode: Planperiode) => {
        if (isUtsettelsesperiode(periode)) {
            result.push(periode);

            const dagerIPerioden = Perioden(periode).getAntallUttaksdager();

            if (dagerIPerioden >= uttaksdagerCurrent) {
                uttaksdagerCurrent = 0;
            } else {
                uttaksdagerCurrent -= dagerIPerioden;
            }

            return result;
        }

        if (isHull(periode) || isPeriodeUtenUttak(periode)) {
            const dagerIPerioden = Perioden(periode).getAntallUttaksdager();

            if (dagerIPerioden > uttaksdagerCurrent) {
                const forskyvetStartdato = UttaksdagenString(UttaksdagenString(periode.fom).denneEllerNeste()).leggTil(
                    uttaksdagerCurrent,
                );
                const justertPeriode: Planperiode = {
                    ...periode,
                    fom: forskyvetStartdato,
                    tom: periode.tom,
                };

                uttaksdagerCurrent = 0;

                result.push(justertPeriode);
                return result;
            } else if (dagerIPerioden === uttaksdagerCurrent) {
                uttaksdagerCurrent = 0;
                return result;
            } else {
                uttaksdagerCurrent -= dagerIPerioden;
                return result;
            }
        }

        result.push(forskyvPeriode(periode, uttaksdagerCurrent));
        return result;
    }, []);
}

function forskyvPeriode(periode: Planperiode, uttaksdager: number): Planperiode {
    if (uttaksdager === 0) {
        return periode;
    }

    const forskyvetStartdato = UttaksdagenString(UttaksdagenString(periode.fom).denneEllerNeste()).leggTil(uttaksdager);
    return Perioden(periode).setStartdato(forskyvetStartdato);
}

function getPerioderFørFamiliehendelsesdato(perioder: Planperiode[], familiehendelsesdato: Date | string) {
    return perioder.filter(
        (periode) =>
            isForeldrepengerFørFødselPeriode(periode) ||
            (isValidTidsperiodeString({ fom: periode.fom, tom: periode.tom }) &&
                dayjs(periode.fom).isBefore(familiehendelsesdato, 'day')),
    );
}

function getPerioderEtterFamiliehendelsesdato(perioder: Planperiode[], familiehendelsesdato: Date | string) {
    return perioder.filter(
        (periode) =>
            isValidTidsperiodeString({ fom: periode.fom, tom: periode.tom }) &&
            dayjs(periode.fom).isSameOrAfter(familiehendelsesdato, 'day') &&
            isForeldrepengerFørFødselPeriode(periode) === false,
    );
}

function getFørstePeriodeEtterFamiliehendelsesdato(
    perioder: Planperiode[],
    familiehendelsesdato: Date,
): Planperiode | undefined {
    const aktuellePerioder = getPerioderEtterFamiliehendelsesdato(perioder, familiehendelsesdato).sort(sorterPerioder);
    return aktuellePerioder.length > 0 ? aktuellePerioder[0] : undefined;
}

function getPeriodeMedUgyldigTidsperiode(perioder: Planperiode[]) {
    return perioder.filter(
        (periode) =>
            isValidTidsperiodeString({ fom: periode.fom, tom: periode.tom }) === false &&
            isForeldrepengerFørFødselPeriode(periode) === false,
    );
}

function getFørsteUttaksdag(perioder: Planperiode[]): string | undefined {
    const førstePeriode = perioder
        .filter((p) => p.fom !== undefined)
        .sort(sorterPerioder)
        .shift();
    if (førstePeriode) {
        return førstePeriode.fom;
    }
    return undefined;
}

function getFørsteUttaksdagEksluderInfoperioderOgFrittUttak(perioder: Planperiode[]): string | undefined {
    const førstePeriode = perioder
        .filter((p) => p.fom !== undefined && !isPeriodeUtenUttak(p))
        .sort(sorterPerioder)
        .shift();
    if (førstePeriode) {
        return førstePeriode.fom;
    }
    return undefined;
}

function getAntallUttaksdager(perioder: Planperiode[]): number {
    return perioder.reduce((dager, periode) => {
        return dager + Perioden(periode).getAntallUttaksdager();
    }, 0);
}

function getForeldrepengerFørTermin(perioder: Planperiode[]): Planperiode | undefined {
    const periode: Planperiode | undefined = perioder.find(
        (p) => isUttaksperiode(p) && p.kontoType === 'FORELDREPENGER_FØR_FØDSEL',
    );

    return periode;
}

function getFørsteUttaksdagEtterSistePeriode(perioder: Planperiode[]): string | undefined {
    if (perioder.length === 0) {
        return undefined;
    }

    return UttaksdagenString(perioder.at(-1)!.tom).neste();
}
export const uttaksplanErBareOpphold = (perioder: Planperiode[]): boolean => {
    if (perioder.length === 0) {
        return false;
    }

    return perioder.every((periode) => !periode.erAnnenPartEøs && periode.oppholdÅrsak !== undefined);
};

export const uttaksplanStarterMedOpphold = (perioder: Planperiode[]): boolean => {
    return perioder.findIndex((periode) => !periode.erAnnenPartEøs && periode.oppholdÅrsak !== undefined) === 0;
};
