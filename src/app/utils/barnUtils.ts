import Barn, { isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';
import { RegistrertBarn } from 'app/types/Person';
import dayjs from 'dayjs';

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn)) {
        return barn.fødselsdatoer[0];
    }
    if (isUfødtBarn(barn)) {
        return barn.termindato;
    }

    return barn.adopsjonsdato;
};

export const getRegistrertBarnOmDetFinnes = (
    barn: Barn,
    registrerteBarn: RegistrertBarn[]
): RegistrertBarn | undefined => {
    return registrerteBarn.length > 0 && isFødtBarn(barn)
        ? registrerteBarn.find((regBarn) => dayjs(regBarn.fødselsdato).isSame(barn.fødselsdatoer[0]))
        : undefined;
};
