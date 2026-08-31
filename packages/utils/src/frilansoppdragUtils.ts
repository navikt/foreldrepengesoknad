import dayjs from 'dayjs';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

const ANTALL_MÅNEDER_TILBAKE = 3;

/**
 * Frilansoppdrag som er relevante å forelegge søker. Samme filtrering må brukes overalt der oppdragene vises,
 * og når de sendes inn med søknaden, slik at PDF-en viser nøyaktig det søker fikk forelagt.
 */
export const filtrerForelagteFrilansoppdrag = (
    frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[],
): EksternArbeidsforholdDto_fpoversikt[] => {
    const grense = dayjs().subtract(ANTALL_MÅNEDER_TILBAKE, 'month');

    return frilansoppdrag.filter((oppdrag) => !oppdrag.tom || !dayjs(oppdrag.tom).isBefore(grense, 'day'));
};
