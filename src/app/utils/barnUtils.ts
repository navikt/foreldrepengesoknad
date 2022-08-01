import { dateToISOString } from '@navikt/sif-common-formik/lib';
import Barn, { isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';
import { RegistrertBarn } from 'app/types/Person';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn)) {
        return dateToISOString(barn.fødselsdatoer[0]);
    }
    if (isUfødtBarn(barn)) {
        return dateToISOString(barn.termindato);
    }

    return dateToISOString(barn.adopsjonsdato);
};

export const getRegistrertBarnOmDetFinnes = (
    barn: Barn,
    registrerteBarn: RegistrertBarn[]
): RegistrertBarn | undefined => {
    return registrerteBarn.length > 0 && isFødtBarn(barn)
        ? registrerteBarn.find((regBarn) => regBarn.fnr === barn.fnr)
        : undefined;
};

export const getTermindato = (barn: Barn): Date | undefined => {
    return isFødtBarn(barn) || isUfødtBarn(barn) ? barn.termindato : undefined;
};

export const getFødselsdato = (barn: Barn): Date | undefined => {
    return isFødtBarn(barn) ? barn.fødselsdatoer[0] : undefined;
};
