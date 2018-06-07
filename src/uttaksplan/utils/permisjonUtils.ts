import { addYears } from 'date-fns';
import { uttaksdagUtil, uttakTidsperiodeUtil } from './uttaksdagerUtils';
import {
    Permisjonsregler,
    Tidsperiode,
    Dekningsgrad,
    Forelder,
    Periode,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Periodetype
} from '../types';
import { getPakrevdMødrekvoteEtterTermin } from 'uttaksplan/uttaksplaner/uttaksplanPlanlegger';

export function getPermisjonStartdato(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Date {
    return uttaksdagUtil(
        termindato // Siste uttaksdag i denne perioden er dagen før termin
    ).leggTil(-1 * permisjonsregler.antallUkerForelder1FørFødsel * 5);
}

export function getSisteMuligePermisjonsdag(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Date {
    return uttaksdagUtil(
        addYears(termindato, permisjonsregler.maksPermisjonslengdeIÅr)
    ).denneEllerNeste();
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
    return {
        startdato: uttaksdagUtil(
            getPakrevdMødrekvoteEtterTermin(termindato, permisjonsregler)
                .sluttdato
        ).neste(),
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
        permisjonsregler.antallUkerForelder1FørFødsel
    );
}

/**
 * Summerer opp antall uttaksdager en forelder har i gitte perioder
 * @param forelder
 * @param perioder
 */
export const getAntallUttaksdagerForForelder = (
    forelder: Forelder,
    perioder: Periode[]
): number => {
    return perioder.reduce(
        (dager: number, periode: Periode) =>
            periode.type === Periodetype.Uttak && periode.forelder === forelder
                ? dager +
                  uttakTidsperiodeUtil(periode.tidsperiode).antallUttaksdager()
                : dager,
        0
    );
};

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
                  uttakTidsperiodeUtil(periode.tidsperiode).antallUttaksdager(),
              0
          );
};
