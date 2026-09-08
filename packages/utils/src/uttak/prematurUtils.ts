import dayjs from 'dayjs';

import { Uttaksdagen } from './Uttaksdagen';

/**
 * Barnet gir rett til prematuruker når det er født mer enn 52 dager (7 uker og 3 dager) før termin.
 *
 * Terskelen må være identisk med regelen i fagsystemet, ellers viser søknaden at stønadsperioden
 * forlenges uten at kvotene fra fpgrunndata faktisk inneholder prematurdagene:
 * - `PrematurukerUtil.PREMATUR_FØDSEL_DAGER_FØR_TERMIN` i navikt/fp-stonadskonto (kvoteberegning)
 * - `Parametertype.PREMATURUKER_ANTALL_DAGER_FØR_TERMIN` i navikt/fp-uttak (vedtaksregel)
 */
const ANTALL_DAGER_PREMATUR_GRENSE = 52;

export const erFødtFørUke33 = (fødselsdato?: string, termindato?: string): boolean => {
    if (!fødselsdato || !termindato || !dayjs(fødselsdato).isValid() || !dayjs(termindato).isValid()) {
        return false;
    }
    return dayjs(termindato).diff(dayjs(fødselsdato), 'day') > ANTALL_DAGER_PREMATUR_GRENSE;
};

/**
 * Antall virkedager fra og med fødselsdato til og med dagen før termindato. Dette tilsvarer antall dager
 * perioden med foreldrepenger blir forlenget med ved en prematur fødsel.
 */
export const getAntallVirkedagerFraFødselTilTermin = (fødselsdato: string, termindato: string): number =>
    Uttaksdagen.denneEllerNeste(fødselsdato).getUttaksdagerFremTilDato(termindato);
