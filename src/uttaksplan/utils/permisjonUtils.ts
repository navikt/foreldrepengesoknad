import { addYears } from 'date-fns';
import { uttaksdagUtil, tidsperioden, periodene } from './dataUtils';
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
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

export function getPermisjonStartdato(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Date {
    return uttaksdagUtil(
        termindato // Siste uttaksdag i denne perioden er dagen før termin
    ).leggTil(-1 * permisjonsregler.antallUkerForeldrepengerFørFødsel * 5);
}

export function getSisteMuligePermisjonsdag(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Date {
    return uttaksdagUtil(
        addYears(termindato, permisjonsregler.maksPermisjonslengdeIÅr)
    ).denneEllerNeste();
}

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
    const utsettelser = periodene(perioder).getUtsettelser();
    const uttaksdagerBruktTotalt = periodene(
        uttaksperioder
    ).getAntallUttaksdager();
    const utsettelserRegistrert = periodene(utsettelser).getAntallUttaksdager();

    const totaltTilgjengeligUttak =
        getAntallUkerTotalt(uttaksgrunnlag.permisjonsregler, dekningsgrad) * 5;
    const registrerteUttak = periodene(perioder).getAntallUttaksdager();
    const gjenståendeUttaksdager = totaltTilgjengeligUttak - registrerteUttak;
    return uttaksdagUtil(termindato).leggTil(
        uttaksdagerBruktTotalt -
            utsettelserRegistrert -
            uttaksgrunnlag.permisjonsregler.antallUkerForeldrepengerFørFødsel *
                5 -
            1 +
            gjenståendeUttaksdager
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
    const startdato = uttaksdagUtil(mødrekvoteEtterTermin.sluttdato).neste();
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
                  tidsperioden(periode.tidsperiode).getAntallUttaksdager()
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
                  tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
              0
          );
};
