import AnnenForelder, { AnnenForelderOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { RettighetType } from 'app/types/RettighetType';
import { SakDTO } from 'app/types/SakDTO';

export const getErMorUfør = (annenForelder: AnnenForelder, erFarEllerMedmor: boolean) => {
    if (isAnnenForelderOppgitt(annenForelder) && erFarEllerMedmor) {
        return !!annenForelder.erUfør;
    }

    return false;
};

export const harAnnenForelderRettIEØS = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) && !!annenForelder.harRettPåForeldrepengerIEØS;
};

export const getMockAnnenForelder = (sak: SakDTO): AnnenForelderOppgitt => {
    return {
        fornavn: 'Annen forelder',
        etternavn: '',
        fnr: sak.annenPart?.fnr !== undefined ? sak.annenPart.fnr : '',
        harRettPåForeldrepengerINorge:
            sak.rettighetType === RettighetType.BEGGE_RETT && !sak.harAnnenForelderTilsvarendeRettEØS,
        kanIkkeOppgis: false,
    };
};
