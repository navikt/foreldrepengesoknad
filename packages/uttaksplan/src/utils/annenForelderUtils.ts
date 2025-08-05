import { AnnenForelder, isAnnenForelderOppgitt } from '@navikt/fp-common';

export const harAnnenForelderRettIEØS = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) && !!annenForelder.harRettPåForeldrepengerIEØS;
};
