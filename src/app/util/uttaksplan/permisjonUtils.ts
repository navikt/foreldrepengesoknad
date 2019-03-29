import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';
import { Uttaksdagen } from './Uttaksdagen';

/**
 * Finner default startdato før termin (antallUkerForeldrepengerFørFødsel)
 * @param familiehendelsedato
 * @param permisjonsregler
 */
export function getDefaultPermisjonStartdato(familiehendelsedato: Date, permisjonsregler: Permisjonsregler): Date {
    const førsteUttaksdag = Uttaksdagen(familiehendelsedato).denneEllerNeste();
    return Uttaksdagen(førsteUttaksdag).trekkFra(permisjonsregler.antallUkerForeldrepengerFørFødsel * 5);
}
