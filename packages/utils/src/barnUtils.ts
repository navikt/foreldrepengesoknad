import { Barn, isFødtBarn } from '@navikt/fp-types';
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
