import { AnnenForelder, Barn, isAnnenForelderOppgitt, isFødtBarn } from '@navikt/fp-common';

import { getFamiliehendelsedato } from './barnUtils';

export const getErAleneOmOmsorg = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.erAleneOmOmsorg : true;
};

export const getDatoForAleneomsorg = (annenForelder: AnnenForelder): string | undefined => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.datoForAleneomsorg : undefined;
};

export const getAnnenPartVedtakParam = (annenForelder: AnnenForelder, barn: Barn) => {
    const annenPartFødselsnummer =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr !== true ? annenForelder.fnr : undefined;
    const barnFødselsnummer =
        isFødtBarn(barn) && barn.fnr !== undefined && barn.fnr?.length > 0 ? barn.fnr[0] : undefined;
    return {
        annenPartFødselsnummer,
        barnFødselsnummer,
        familiehendelse: getFamiliehendelsedato(barn),
    };
};

export const shouldSuspendAnnenPartVedtakApiRequest = (annenForelder: AnnenForelder) => {
    const annenPartFnr =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr !== true ? annenForelder.fnr : undefined;
    return annenPartFnr !== undefined && annenPartFnr !== '' ? false : true;
};

export const getIsDeltUttak = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;
};
