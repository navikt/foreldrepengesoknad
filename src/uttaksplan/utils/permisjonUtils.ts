import { addYears } from 'date-fns';
import { Uttaksdagen, Tidsperioden } from './dataUtils';
import {
    Permisjonsregler,
    Tidsperiode,
    Dekningsgrad,
    Forelder,
    Utsettelsesperiode,
    UtsettelseÅrsakType
} from '../types';
import { getPakrevdMødrekvoteEtterTermin } from 'uttaksplan/uttaksplaner/uttaksplanPlanlegger';

/**
 * Finner default startdato før termin (antallUkerForeldrepengerFørFødsel)
 * @param familiehendelsedato
 * @param permisjonsregler
 */
export function getPermisjonStartdato(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler
): Date {
    return Uttaksdagen(
        familiehendelsedato // Siste uttaksdag i denne perioden er dagen før termin
    ).trekkFra(permisjonsregler.antallUkerForeldrepengerFørFødsel * 5);
}

/**
 * Finner default startdato før termin (antallUkerForeldrepengerFørFødsel)
 * @param familiehendelsedato
 * @param permisjonsregler
 */
export function getFørsteMuligePermisjonsdag(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler
): Date {
    return Uttaksdagen(
        familiehendelsedato // Siste uttaksdag i denne perioden er dagen før termin
    ).trekkFra(permisjonsregler.maksAntallUkerForeldrepengerFørFødsel * 5);
}

/**
 * Finner absolutt siste permisjonsdag
 * @param familiehendelsedato
 * @param permisjonsregler
 */
export function getSisteMuligePermisjonsdag(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler
): Date {
    return Uttaksdagen(
        addYears(familiehendelsedato, permisjonsregler.maksPermisjonslengdeIÅr)
    ).denneEllerNeste();
}

/**
 * Henter ut gyldig tidsrom å legge inn en utsettelse
 * @param familiehendelsedato
 * @param dekningsgrad
 * @param permisjonsregler
 */
export function getGyldigTidsromForUtsettelse(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler,
    sisteRegistrertePermisjonsdag: Date
): Tidsperiode {
    const mødrekvoteEtterTermin = getPakrevdMødrekvoteEtterTermin(
        familiehendelsedato,
        permisjonsregler
    );
    const startdato = Uttaksdagen(mødrekvoteEtterTermin.sluttdato).neste();
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
                  Tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
              0
          );
};
