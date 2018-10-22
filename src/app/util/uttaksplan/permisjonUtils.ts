import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';
import { Dekningsgrad } from 'common/types';
import { Uttaksdagen } from './Uttaksdagen';

/**
 * Finner default startdato før termin (antallUkerForeldrepengerFørFødsel)
 * @param familiehendelsedato
 * @param permisjonsregler
 */
export function getDefaultPermisjonStartdato(familiehendelsedato: Date, permisjonsregler: Permisjonsregler): Date {
    return Uttaksdagen(
        familiehendelsedato // Siste uttaksdag i denne perioden er dagen før termin
    ).trekkFra(permisjonsregler.antallUkerForeldrepengerFørFødsel * 5);
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
