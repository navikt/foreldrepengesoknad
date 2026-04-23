import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import { Barn, isFødtBarn } from '@navikt/fp-types';

import { getFamiliehendelsedato } from './barnUtils';

export const getErAleneOmOmsorg = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.erAleneOmOmsorg : true;
};

export const getDatoForAleneomsorg = (annenForelder: AnnenForelder): string | undefined => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.datoForAleneomsorg : undefined;
};

export type AnnenPartVedtakParams = {
    annenPartFødselsnummer?: string;
    barnFødselsnummer?: string;
    familiehendelse: string;
};

export const getAnnenPartVedtakParam = (annenForelder: AnnenForelder, barn: Barn): AnnenPartVedtakParams => {
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

export const annenForelderHarNorskFnr = (annenForelder: AnnenForelder) => {
    const annenPartFnr =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr !== true ? annenForelder.fnr : undefined;
    return annenPartFnr !== undefined && annenPartFnr !== '';
};

export const getIsDeltUttak = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;
};

export const getErMorUfør = (annenForelder: AnnenForelder, erFarEllerMedmor: boolean) => {
    if (isAnnenForelderOppgitt(annenForelder) && erFarEllerMedmor) {
        return !!annenForelder.erMorUfør;
    }

    return false;
};
