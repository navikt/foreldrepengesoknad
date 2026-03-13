import dayjs from 'dayjs';

import { Barn, Familiesituasjon, isFødtBarn } from '@navikt/fp-types';
import { isAdoptertBarn, isIkkeUtfyltTypeBarn, isUfødtBarn } from '@navikt/fp-types/src/Barn';

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn) || isIkkeUtfyltTypeBarn(barn)) {
        return barn.fødselsdatoer[0]!;
    }
    if (isUfødtBarn(barn)) {
        return barn.termindato;
    }

    return barn.adopsjonsdato;
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
