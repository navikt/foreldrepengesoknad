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

const barnFødselsdatoLikSakFødselsdato = (fødselsdatoer: Date[], regBarnFødselsdato: Date) => {
    return fødselsdatoer.find((fødselsdato) => dayjs(fødselsdato).isSame(regBarnFødselsdato)) !== undefined;
};

export const getRegistrertBarnOmDetFinnes = (
    barn: Barn,
    registrerteBarn: RegistrertBarn[]
): RegistrertBarn | undefined => {
    return registrerteBarn.length > 0 && isFødtBarn(barn)
        ? registrerteBarn.find(
              (regBarn) =>
                  regBarn.fnr === barn.fnr || barnFødselsdatoLikSakFødselsdato(barn.fødselsdatoer, regBarn.fødselsdato)
          )
        : undefined;
};

export const getTermindato = (barn: Barn): Date | undefined => {
    return isFødtBarn(barn) || isUfødtBarn(barn) ? barn.termindato : undefined;
};

export const getFødselsdato = (barn: Barn): Date | undefined => {
    return isFødtBarn(barn) ? barn.fødselsdatoer[0] : undefined;
};
