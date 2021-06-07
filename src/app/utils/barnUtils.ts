import Barn, { isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn)) {
        return barn.fødselsdatoer[0];
    }
    if (isUfødtBarn(barn)) {
        return barn.termindato;
    }

    return barn.adopsjonsdato;
};
