import { addYears } from 'date-fns';
import { uttaksdagen, tidsperioden, periodene } from './dataUtils';
import {
    Permisjonsregler,
    Tidsperiode,
    Dekningsgrad,
    Forelder,
    Periode,
    Utsettelsesperiode,
    UtsettelseÅrsakType
} from '../types';
import { getPakrevdMødrekvoteEtterTermin } from 'uttaksplan/uttaksplaner/uttaksplanPlanlegger';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

/**
 * Finner default startdato før termin (antallUkerForeldrepengerFørFødsel)
 * @param termindato
 * @param permisjonsregler
 */
export function getPermisjonStartdato(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Date {
    return uttaksdagen(
        termindato // Siste uttaksdag i denne perioden er dagen før termin
    ).leggTil(-1 * permisjonsregler.antallUkerForeldrepengerFørFødsel * 5);
}

/**
 * Finner absolutt siste permisjonsdag
 * @param termindato
 * @param permisjonsregler
 */
export function getSisteMuligePermisjonsdag(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Date {
    return uttaksdagen(
        addYears(termindato, permisjonsregler.maksPermisjonslengdeIÅr)
    ).denneEllerNeste();
}

/**
 * Finner siste permisjonsdag gitt registrerte perioder
 * @param termindato
 * @param dekningsgrad
 * @param perioder
 * @param uttaksgrunnlag
 */
export function getSistePermisjonsdag(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    perioder: Periode[],
    uttaksgrunnlag: Uttaksgrunnlag
): Date | undefined {
    if (perioder.length === 0) {
        return undefined;
    }
    const uttaksperioder = periodene(perioder).getUttak();
    const uttaksdagerBruktTotalt = periodene(
        uttaksperioder
    ).getAntallDagerUttak();
    const utsatteDager = periodene(perioder).getAntallDagerUtsatt();
    const registrerteUttak = periodene(perioder).getAntallDagerUttak();
    const gjenståendeUttaksdager =
        uttaksgrunnlag.tilgjengeligeUttaksdager - registrerteUttak;
    return uttaksdagen(termindato).leggTil(
        uttaksdagerBruktTotalt -
            uttaksgrunnlag.permisjonsregler.antallUkerForeldrepengerFørFødsel *
                5 -
            1 +
            gjenståendeUttaksdager +
            utsatteDager
    );
}

/**
 * Henter ut gyldig tidsrom å legge inn en utsettelse
 * @param termindato
 * @param dekningsgrad
 * @param permisjonsregler
 */
export function getGyldigTidsromForUtsettelse(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    permisjonsregler: Permisjonsregler,
    sisteRegistrertePermisjonsdag: Date
): Tidsperiode {
    const mødrekvoteEtterTermin = getPakrevdMødrekvoteEtterTermin(
        termindato,
        permisjonsregler
    );
    const startdato = uttaksdagen(mødrekvoteEtterTermin.sluttdato).neste();
    return {
        startdato,
        sluttdato: sisteRegistrertePermisjonsdag
    };
}

/**
 * Finner antall uker for fellesperiode ut fra dekningsgrad
 * @param permisjonsregler
 * @param dekningsgrad
 */
export function getAntallUkerFellesperiode(
    permisjonsregler: Permisjonsregler,
    dekningsgrad: Dekningsgrad
) {
    const totaltAntallUker =
        dekningsgrad === '80%'
            ? permisjonsregler.antallUkerTotalt80
            : permisjonsregler.antallUkerTotalt100;
    return (
        totaltAntallUker -
        permisjonsregler.antallUkerMødrekvote -
        permisjonsregler.antallUkerFedrekvote -
        permisjonsregler.antallUkerForeldrepengerFørFødsel
    );
}
/**
 * Finner totalt antall uker tilgjengelig
 * @param permisjonsregler
 * @param dekningsgrad
 */
export function getAntallUkerTotalt(
    permisjonsregler: Permisjonsregler,
    dekningsgrad: Dekningsgrad
) {
    return dekningsgrad === '80%'
        ? permisjonsregler.antallUkerTotalt80
        : permisjonsregler.antallUkerTotalt100;
}

// /**
//  * Summerer opp antall uttaksdager en forelder har i gitte perioder
//  * @param forelder
//  * @param perioder
//  */
// export const getAntallUttaksdagerForForelder = (
//     forelder: Forelder,
//     perioder: Periode[]
// ): number => {
//     return perioder.reduce(
//         (dager: number, periode: Periode) =>
//             periode.type === Periodetype.Uttak && periode.forelder === forelder
//                 ? dager +
//                   tidsperioden(periode.tidsperiode).getAntallUttaksdager()
//                 : dager,
//         0
//     );
// };

/**
 * Summerer antall uttaksdager som er registrert som ferie for en forelder
 * @param utsettelser
 * @param forelder
 */
export const getAntallFeriedagerForForelder = (
    utsettelser: Utsettelsesperiode[],
    forelder: Forelder
): number => {
    const ferier = utsettelser.filter(
        (utsettelse) =>
            utsettelse.årsak === UtsettelseÅrsakType.Ferie &&
            utsettelse.forelder === forelder
    );
    return ferier.length === 0
        ? 0
        : ferier.reduce(
              (dager: number, periode: Utsettelsesperiode) =>
                  dager +
                  tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
              0
          );
};
