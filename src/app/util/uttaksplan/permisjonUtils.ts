import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';
import { Tidsperiode, Dekningsgrad, Forelder } from 'common/types';
import { Utsettelsesperiode, UtsettelseÅrsakType } from '../../types/uttaksplan/periodetyper';
import { getPakrevdMødrekvoteEtterTermin } from './forslag/util';
import { Tidsperioden } from './Tidsperioden';
import { Uttaksdagen } from './Uttaksdagen';

/**
 *
 * Denne må nok modifiseres noe når de ulike søkertypene/rollene tas i bruk
 *
 */

/**
 * Finner default startdato før termin (antallUkerForeldrepengerFørFødsel)
 * @param familiehendelsedato
 * @param permisjonsregler
 */
export function getPermisjonStartdato(familiehendelsedato: Date, permisjonsregler: Permisjonsregler): Date {
    return Uttaksdagen(
        familiehendelsedato // Siste uttaksdag i denne perioden er dagen før termin
    ).trekkFra(permisjonsregler.antallUkerForeldrepengerFørFødsel * 5);
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
    const mødrekvoteEtterTermin = getPakrevdMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler);
    const fom = Uttaksdagen(mødrekvoteEtterTermin.tom).neste();
    return {
        fom,
        tom: sisteRegistrertePermisjonsdag
    };
}

/**
 * Finner antall uker for fellesperiode ut fra dekningsgrad
 * @param permisjonsregler
 * @param dekningsgrad
 */
export function getAntallUkerFellesperiode(permisjonsregler: Permisjonsregler, dekningsgrad: Dekningsgrad) {
    const totaltAntallUker =
        dekningsgrad === '80' ? permisjonsregler.antallUkerTotalt80 : permisjonsregler.antallUkerTotalt100;
    return (
        totaltAntallUker -
        permisjonsregler.antallUkerMødrekvote -
        permisjonsregler.antallUkerFedrekvote -
        permisjonsregler.antallUkerForeldrepengerFørFødsel
    );
}

/**
 * Summerer antall uttaksdager som er registrert som ferie for en forelder
 * @param utsettelser
 * @param forelder
 */
export const getAntallFeriedagerForForelder = (utsettelser: Utsettelsesperiode[], forelder: Forelder): number => {
    const ferier = utsettelser.filter(
        (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Ferie && utsettelse.forelder === forelder
    );
    return ferier.length === 0
        ? 0
        : ferier.reduce(
              (dager: number, periode: Utsettelsesperiode) =>
                  dager + Tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
              0
          );
};

/**
 * Finner totalt antall uker tilgjengelig
 * @param permisjonsregler
 * @param dekningsgrad
 */
export function getAntallUkerTotalt(permisjonsregler: Permisjonsregler, dekningsgrad: Dekningsgrad) {
    return dekningsgrad === '80' ? permisjonsregler.antallUkerTotalt80 : permisjonsregler.antallUkerTotalt100;
}
