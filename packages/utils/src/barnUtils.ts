import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    Barn,
    Familiesituasjon,
    isAdoptertBarn,
    isFødtBarn,
    isIkkeUtfyltTypeBarn,
    isUfødtBarn,
} from '@navikt/fp-types';

dayjs.extend(utc);

/**
 * Familiehendelsedatoen er en kalenderdato. Enkelte kilder (f.eks.
 * `barn.fødselsdatoer`) serialiserer den som UTC-midnatt, altså
 * `"2026-06-18T00:00:00.000Z"`. Uten normalisering vil datosammenligninger mot
 * familiehendelsedatoen bomme med én dag: rene datoperioder som `"2026-06-18"`
 * tolkes som *lokal* midnatt, som i norsk tid ligger før UTC-midnatt, slik at en
 * periode som starter på selve fødselsdatoen feilaktig regnes som før fødsel.
 *
 * Vi tolker derfor datoen eksplisitt i UTC og formaterer den til `YYYY-MM-DD`.
 * Dette er tidssone-uavhengig (i motsetning til lokal `dayjs(dato).format(...)`,
 * som ville gjeninnført samme feil).
 */
const tilKalenderdato = (dato: string): string => (dato ? dayjs.utc(dato).format(ISO_DATE_FORMAT) : dato);

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
