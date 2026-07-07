import dayjs from 'dayjs';

import {
    Barn,
    Familiesituasjon,
    isAdoptertBarn,
    isFødtBarn,
    isIkkeUtfyltTypeBarn,
    isUfødtBarn,
} from '@navikt/fp-types';

/**
 * Familiehendelsedatoen er en kalenderdato. Enkelte kilder (f.eks.
 * `barn.fødselsdatoer`) serialiserer den som UTC-midnatt, altså
 * `"2026-06-18T00:00:00.000Z"`. Uten normalisering vil dayjs tolke rene
 * datoperioder som `"2026-06-18"` som *lokal* midnatt, som i norsk tid ligger
 * før UTC-midnatt. Datosammenligninger mot familiehendelsedatoen (f.eks. om en
 * uttaksperiode er før/etter fødsel) blir da feil med én dag. Vi kutter derfor
 * bort en eventuell tidskomponent og beholder bare `YYYY-MM-DD`.
 */
const tilKalenderdato = (dato: string): string => dato?.slice(0, 10);

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn) || isIkkeUtfyltTypeBarn(barn)) {
        return tilKalenderdato(barn.fødselsdatoer[0]!);
    }
    if (isUfødtBarn(barn)) {
        return tilKalenderdato(barn.termindato);
    }

    return tilKalenderdato(barn.adopsjonsdato);
};

type PersonMedFødselsdato = { fødselsdato: string; navn?: { fornavn?: string } };

export const sorterPersonEtterEldstOgNavn = (p1: PersonMedFødselsdato, p2: PersonMedFødselsdato) => {
    if (dayjs(p1.fødselsdato).isAfter(p2.fødselsdato, 'd')) {
        return 1;
    } else if (dayjs(p1.fødselsdato).isBefore(p2.fødselsdato, 'd')) {
        return -1;
    } else {
        const fornavn1 = p1.navn?.fornavn ?? '';
        const fornavn2 = p2.navn?.fornavn ?? '';

        if (fornavn1 < fornavn2) {
            return -1;
        }
        if (fornavn1 > fornavn2) {
            return 1;
        }
        return 0;
    }
};

export const getFamiliesituasjon = (barn: Barn): Familiesituasjon => {
    if (isFødtBarn(barn) || isIkkeUtfyltTypeBarn(barn)) {
        return 'fødsel';
    }
    if (isUfødtBarn(barn)) {
        return 'termin';
    }
    if (isAdoptertBarn(barn)) {
        return 'adopsjon';
    }

    throw new Error('Ukjent barnetype');
};
