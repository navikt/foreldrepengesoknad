import { intlUtils } from 'common';
import { AnnenForelder, AnnenForelderOppgitt, Sak, isAnnenForelderOppgitt } from 'common/types';
import { RettighetType } from 'common/types/RettighetType';
import { IntlShape } from 'react-intl';

export const getErMorUfør = (annenForelder: AnnenForelder, erFarEllerMedmor: boolean) => {
    if (isAnnenForelderOppgitt(annenForelder) && erFarEllerMedmor) {
        return !!annenForelder.erUfør;
    }

    return false;
};

export const harAnnenForelderRettIEØS = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) && !!annenForelder.harRettPåForeldrepengerIEØS;
};

export const getMockAnnenForelder = (sak: Sak, intl: IntlShape): AnnenForelderOppgitt => {
    return {
        fornavn: intlUtils(intl, 'annen.forelder'),
        etternavn: '',
        fnr: '',
        harRettPåForeldrepengerINorge:
            sak.rettighetType === RettighetType.BEGGE_RETT && !sak.harAnnenForelderTilsvarendeRettEØS,
        harRettPåForeldrepengerIEØS: sak.harAnnenForelderTilsvarendeRettEØS,
        erUfør: (!sak.sakTilhørerMor && sak.morUføretrygd) || undefined,
        kanIkkeOppgis: false,
    };
};
