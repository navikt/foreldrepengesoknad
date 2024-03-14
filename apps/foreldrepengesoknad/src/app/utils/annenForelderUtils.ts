import { AnnenForelder, isAnnenForelderOppgitt } from '@navikt/fp-common';

export const getErAleneOmOmsorg = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.erAleneOmOmsorg : true;
};

export const getDatoForAleneomsorg = (annenForelder: AnnenForelder): string | undefined => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.datoForAleneomsorg : undefined;
};
