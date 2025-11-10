import dayjs from 'dayjs';

import { Barn, BarnDto_fpoversikt, isFødtBarn } from '@navikt/fp-types';
import { isIkkeUtfyltTypeBarn, isUfødtBarn } from '@navikt/fp-types/src/Barn';

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn) || isIkkeUtfyltTypeBarn(barn)) {
        return barn.fødselsdatoer[0];
    }
    if (isUfødtBarn(barn)) {
        return barn.termindato;
    }

    return barn.adopsjonsdato;
};

export const sorterPersonEtterEldstOgNavn = (p1: BarnDto_fpoversikt, p2: BarnDto_fpoversikt) => {
    if (dayjs(p1.fødselsdato).isAfter(p2.fødselsdato, 'd')) {
        return 1;
    } else if (dayjs(p1.fødselsdato).isBefore(p2.fødselsdato, 'd')) {
        return -1;
    } else {
        const fornavn1 = p1.navn?.fornavn ?? '';
        const fornavn2 = p2.navn?.fornavn ?? '';

        return fornavn1 < fornavn2 ? -1 : 1;
    }
};
