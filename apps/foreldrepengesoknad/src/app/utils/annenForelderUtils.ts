import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';

export const getErMorUfør = (annenForelder: AnnenForelder, erFarEllerMedmor: boolean) => {
    if (isAnnenForelderOppgitt(annenForelder) && erFarEllerMedmor) {
        return !!annenForelder.erUfør;
    }

    return false;
};

export const harAnnenForelderRettIEØS = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) && !!annenForelder.harRettPåForeldrepengerIEØS;
};
