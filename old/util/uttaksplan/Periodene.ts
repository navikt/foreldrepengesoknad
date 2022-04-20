import moment from 'moment';
import {
    Periode,
    Uttaksperiode,
    Utsettelsesperiode,
    Oppholdsperiode,
    PeriodeHull,
    isForeldrepengerFørFødselUttaksperiode,
    Overføringsperiode,
    StønadskontoType,
    ForeldrepengerFørFødselUttaksperiode,
    InfoPeriode,
    isHull,
    isInfoPeriode,
    isUtsettelsePgaFerie,
    isOppholdsperiode,
    isOverføringsperiode,
    isUtsettelsesperiode,
    isUttaksperiode,
    isPeriodeUtenUttak,
    PeriodeUtenUttak,
} from '../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import { Perioden } from './Perioden';
import { Uttaksdagen } from './Uttaksdagen';
import { isValidTidsperiode, Tidsperioden, datoErInnenforTidsperiode } from './Tidsperioden';

export const Periodene = (perioder: Periode[]) => ({
    getPeriode: (id: string) => getPeriode(perioder, id),
    getOpphold: () => getOpphold(perioder),
    getUttak: () => getUttaksperioder(perioder),
    getOverføringer: () => getOverføringer(perioder),
    getHull: () => getHull(perioder),
    getHullOgInfoOgPerioderUtenUttak: () => getHullOgInfoOgPerioderUtenUttak(perioder),
    getInfoperioder: () => getInfoperioder(perioder),
    getUtsettelser: () => getUtsettelser(perioder),
    getPerioderEtterFamiliehendelsesdato: (dato: Date) => getPerioderEtterFamiliehendelsesdato(perioder, dato),
    getPerioderFørFamiliehendelsesdato: (dato: Date) => getPerioderFørFamiliehendelsesdato(perioder, dato),
    getPerioderMedUgyldigTidsperiode: () => getPeriodeMedUgyldigTidsperiode(perioder),
    getPerioderMedFerieForForelder: (forelder: Forelder) => getPerioderMedFerieForForelder(perioder, forelder),
    getFørstePerioderEtterFamiliehendelsesdato: (dato: Date) =>
        getFørstePeriodeEtterFamiliehendelsesdato(perioder, dato),
    getForeldrepengerFørTermin: () => getForeldrepengerFørTermin(perioder),
    getFørsteUttaksdag: () => getFørsteUttaksdag(perioder),
    getFørsteUttaksdagEtterSistePeriode: () => getFørsteUttaksdagEtterSistePeriode(perioder),
    getFørsteUttaksdagEksluderInfoperioder: () => getFørsteUttaksdagEksluderInfoperioder(perioder),
    getAntallUttaksdager: () => getAntallUttaksdager(perioder),
    getAntallFeriedager: (forelder?: Forelder) => getAntallFeriedager(perioder, forelder),
    finnOverlappendePerioder: (periode: Periode) => finnOverlappendePerioder(perioder, periode),
    finnPeriodeMedDato: (dato: Date) => finnPeriodeMedDato(perioder, dato),
    finnFørstePeriodeEtterDato: (dato: Date) => finnFørstePeriodeEtterDato(perioder, dato),
    finnAlleForegåendePerioder: (periode: Periode) => finnPerioderFørPeriode(perioder, periode),
    finnAllePåfølgendePerioder: (periode: Periode) => finnPerioderEtterPeriode(perioder, periode),
    finnDenForegåendePerioden: (periode: Periode) => finnForrigePeriode(perioder, periode),
    finnPåfølgendePeriode: (periode: Periode) => finnPåfølgendePeriode(perioder, periode),
    forskyvPerioder: (uttaksdager: number) => forskyvPerioder(perioder, uttaksdager),
    sort: () => perioder.sort(sorterPerioder),
    finnSisteInfoperiode: () => finnSisteInfoperiode(perioder),
});

export function sorterPerioder(p1: Periode, p2: Periode) {
    if (isValidTidsperiode(p1.tidsperiode) === false || isValidTidsperiode(p2.tidsperiode) === false) {
        if (isForeldrepengerFørFødselUttaksperiode(p1) && p1.skalIkkeHaUttakFørTermin) {
            return -1;
        }
        return isValidTidsperiode(p1.tidsperiode) ? -1 : 1;
    }
    if (moment(p1.tidsperiode.fom).isSame(p2.tidsperiode.fom, 'day')) {
        return isInfoPeriode(p1) ? -1 : 1;
    }

    if (Tidsperioden(p2.tidsperiode).erOmsluttetAv(p1.tidsperiode)) {
        return 1;
    }

    return moment(p1.tidsperiode.fom).isBefore(p2.tidsperiode.fom, 'day') ? -1 : 1;
}

function getPeriode(perioder: Periode[], id: string): Periode | undefined {
    return perioder.find((p) => p.id === id);
}

function getUttaksperioder(perioder: Periode[]): Uttaksperiode[] {
    return perioder.filter((periode) => isUttaksperiode(periode)) as Uttaksperiode[];
}

function getUtsettelser(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter((periode) => isUtsettelsesperiode(periode)) as Utsettelsesperiode[];
}

function getFerieUtsettelser(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter((periode) => isUtsettelsePgaFerie(periode)) as Utsettelsesperiode[];
}

function getOverføringer(perioder: Periode[]): Overføringsperiode[] {
    return perioder.filter((periode) => isOverføringsperiode(periode)) as Overføringsperiode[];
}

function getHull(perioder: Periode[]): PeriodeHull[] {
    return perioder.filter((periode) => isHull(periode)) as PeriodeHull[];
}

function getHullOgInfoOgPerioderUtenUttak(perioder: Periode[]): (PeriodeHull | InfoPeriode | PeriodeUtenUttak)[] {
    return perioder.filter((periode) => isHull(periode) || isInfoPeriode(periode) || isPeriodeUtenUttak(periode)) as (
        | PeriodeHull
        | InfoPeriode
        | PeriodeUtenUttak
    )[];
}

function getInfoperioder(perioder: Periode[]): InfoPeriode[] {
    return perioder.filter((periode) => isInfoPeriode(periode)) as InfoPeriode[];
}

function getOpphold(perioder: Periode[]): Oppholdsperiode[] {
    return perioder.filter((periode) => isOppholdsperiode(periode)) as Oppholdsperiode[];
}

function finnOverlappendePerioder(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => {
        if (p.id === periode.id || !isValidTidsperiode(periode.tidsperiode)) {
            return false;
        }
        const { fom, tom } = p.tidsperiode;
        if (!fom || !tom) {
            return false;
        }
        const fomEllerTomErInnenforTidsperiode =
            datoErInnenforTidsperiode(fom, periode.tidsperiode) || datoErInnenforTidsperiode(tom, periode.tidsperiode);

        const fomTomOmkranserTidsperiode =
            moment(periode.tidsperiode.fom).isSameOrAfter(fom, 'day') &&
            moment(periode.tidsperiode.tom).isSameOrBefore(tom, 'day');

        return fomEllerTomErInnenforTidsperiode || fomTomOmkranserTidsperiode;
    });
}

function finnPeriodeMedDato(perioder: Periode[], dato: Date): Periode | undefined {
    return perioder.find((periode) => {
        return moment(dato).isBetween(periode.tidsperiode.fom, periode.tidsperiode.tom, 'day', '[]');
    });
}

function finnFørstePeriodeEtterDato(perioder: Periode[], dato: Date): Periode | undefined {
    return perioder.find((periode) => {
        return moment(periode.tidsperiode.fom).isAfter(dato, 'day');
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
    let uttaksdagerCurrent = uttaksdager;

    return perioder.reduce((result: Periode[], periode: Periode) => {
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

        if (isInfoPeriode(periode) || isOppholdsperiode(periode)) {
            const dagerIPerioden = Perioden(periode).getAntallUttaksdager();

            if (dagerIPerioden > uttaksdagerCurrent) {
                const forskyvetStartdato = Uttaksdagen(Uttaksdagen(periode.tidsperiode.fom).denneEllerNeste()).leggTil(
                    uttaksdagerCurrent
                );
                const justertPeriode: Periode = {
                    ...periode,
                    tidsperiode: {
                        fom: forskyvetStartdato,
                        tom: periode.tidsperiode.tom,
                    },
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

function forskyvPeriode(periode: Periode, uttaksdager: number): Periode {
    const forskyvetStartdato = Uttaksdagen(Uttaksdagen(periode.tidsperiode.fom).denneEllerNeste()).leggTil(uttaksdager);
    return Perioden(periode).setStartdato(forskyvetStartdato);
}

function getPerioderFørFamiliehendelsesdato(perioder: Periode[], familiehendelsesdato: Date) {
    return perioder.filter(
        (periode) =>
            isForeldrepengerFørFødselUttaksperiode(periode) ||
            (isValidTidsperiode(periode.tidsperiode) &&
                moment(periode.tidsperiode.fom).isBefore(familiehendelsesdato, 'day'))
    );
}

function getPerioderEtterFamiliehendelsesdato(perioder: Periode[], familiehendelsesdato: Date) {
    return perioder.filter(
        (periode) =>
            isValidTidsperiode(periode.tidsperiode) &&
            moment(periode.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'day') &&
            isForeldrepengerFørFødselUttaksperiode(periode) === false
    );
}

function getFørstePeriodeEtterFamiliehendelsesdato(
    perioder: Periode[],
    familiehendelsesdato: Date
): Periode | undefined {
    const aktuellePerioder = getPerioderEtterFamiliehendelsesdato(perioder, familiehendelsesdato).sort(sorterPerioder);
    return aktuellePerioder.length > 0 ? aktuellePerioder[0] : undefined;
}

function getPeriodeMedUgyldigTidsperiode(perioder: Periode[]) {
    return perioder.filter(
        (periode) =>
            isValidTidsperiode(periode.tidsperiode) === false &&
            isForeldrepengerFørFødselUttaksperiode(periode) === false
    );
}

function getFørsteUttaksdag(perioder: Periode[]): Date | undefined {
    const førstePeriode = perioder
        .filter((p) => p.tidsperiode.fom !== undefined)
        .sort(sorterPerioder)
        .shift();
    if (førstePeriode) {
        return førstePeriode.tidsperiode.fom;
    }
    return undefined;
}

function getFørsteUttaksdagEksluderInfoperioder(perioder: Periode[]): Date | undefined {
    const førstePeriode = perioder
        .filter((p) => p.tidsperiode.fom !== undefined && !isInfoPeriode(p))
        .sort(sorterPerioder)
        .shift();
    if (førstePeriode) {
        return førstePeriode.tidsperiode.fom;
    }
    return undefined;
}

function getAntallUttaksdager(perioder: Periode[]): number {
    return perioder.reduce((dager, periode) => {
        return dager + Perioden(periode).getAntallUttaksdager();
    }, 0);
}

function getAntallFeriedager(perioder: Periode[], forelder?: Forelder): number {
    return getFerieUtsettelser(perioder)
        .filter((p) => (isValidTidsperiode(p.tidsperiode) && forelder ? p.forelder === forelder : true))
        .map((p) => Tidsperioden(p.tidsperiode).getAntallUttaksdager())
        .reduce((tot = 0, curr) => tot + curr, 0);
}

function getPerioderMedFerieForForelder(perioder: Periode[], forelder: Forelder): Periode[] {
    return perioder.filter((periode) => erPeriodeMedFerieForForelder(periode, forelder));
}

function getForeldrepengerFørTermin(perioder: Periode[]): ForeldrepengerFørFødselUttaksperiode | undefined {
    const periode: Periode | undefined = perioder.find(
        (p) => isUttaksperiode(p) && p.konto === StønadskontoType.ForeldrepengerFørFødsel
    );
    return periode ? (periode as ForeldrepengerFørFødselUttaksperiode) : undefined;
}

function getFørsteUttaksdagEtterSistePeriode(perioder: Periode[]): Date | undefined {
    if (perioder.length === 0) {
        return undefined;
    }
    return Uttaksdagen(perioder[perioder.length - 1].tidsperiode.tom).neste();
}

export const erPeriodeMedFerieForForelder = (periode: Periode, forelder: Forelder): boolean => {
    return isUtsettelsePgaFerie(periode) && periode.forelder === forelder;
};

function finnSisteInfoperiode(perioder: Periode[]) {
    return perioder
        .filter((p) => isInfoPeriode(p))
        .sort(sorterPerioder)
        .reverse()[0];
}
