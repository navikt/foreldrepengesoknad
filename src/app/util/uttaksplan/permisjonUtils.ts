import { Uttaksdagen } from './Uttaksdagen';
import uttaksConstants from 'app/constants';

/**
 * Finner default startdato før termin (antallUkerForeldrepengerFørFødsel)
 * @param familiehendelsedato
 * @param permisjonsregler
 */
export function getDefaultPermisjonStartdato(familiehendelsedato: Date): Date {
    const førsteUttaksdag = Uttaksdagen(familiehendelsedato).denneEllerNeste();
    return Uttaksdagen(førsteUttaksdag).trekkFra(uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5);
}
