import { intlUtils } from '@navikt/fp-common';
import AnnenForelder, { AnnenForelderOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { RettighetType } from 'app/types/RettighetType';
import { Sak } from 'app/types/Sak';
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
