import { Barn, Familiesituasjon, isFødtBarn } from '@navikt/fp-types';
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

export const getFamiliesituasjon = (barn: Barn): Familiesituasjon => {
    if (isFødtBarn(barn) || isIkkeUtfyltTypeBarn(barn)) {
        return 'fødsel';
    }
    if (isUfødtBarn(barn)) {
        return 'termin';
    }

    return 'adopsjon';
};
