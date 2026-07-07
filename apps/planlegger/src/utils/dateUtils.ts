import dayjs from 'dayjs';

import { Uttaksdagen } from '@navikt/fp-utils';

/** Barnet regnes som født før 33. svangerskapsuke når det er født mer enn 7 uker (49 dager) før termin. */
const ANTALL_DAGER_UKE_33_GRENSE = 49;

export const erFødtFørUke33 = (fødselsdato?: string, termindato?: string): boolean => {
    if (!fødselsdato || !termindato || !dayjs(fødselsdato).isValid() || !dayjs(termindato).isValid()) {
        return false;
    }
    return dayjs(termindato).diff(dayjs(fødselsdato), 'day') > ANTALL_DAGER_UKE_33_GRENSE;
};

/**
 * Antall virkedager fra og med fødselsdato til og med dagen før termindato. Dette tilsvarer antall dager
 * perioden med foreldrepenger blir forlenget med ved en prematur fødsel.
 */
export const getAntallVirkedagerFraFødselTilTermin = (fødselsdato: string, termindato: string): number =>
    Uttaksdagen.denneEllerNeste(fødselsdato).getUttaksdagerFremTilDato(termindato);

