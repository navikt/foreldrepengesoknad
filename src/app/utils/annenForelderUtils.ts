// import { IntlShape } from '@formatjs/intl';
// import { intlUtils } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
// import { Saksgrunnlag } from 'app/types/Saksgrunnlag';

export const getErMorUfør = (annenForelder: AnnenForelder, erFarEllerMedmor: boolean) => {
    if (isAnnenForelderOppgitt(annenForelder) && erFarEllerMedmor) {
        return !!annenForelder.erUfør;
    }

    return false;
};

export const harAnnenForelderRettIEØS = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) && !!annenForelder.harRettPåForeldrepengerIEØS;
};

// export const getMockAnnenForelder = (grunnlag: Saksgrunnlag, intl: IntlShape): Partial<AnnenForelder> => {
//     return {
//         fornavn: intlUtils(intl, 'annen.forelder'),
//         etternavn: '',
//         fnr: '',
//         harRettPåForeldrepengerINorge: grunnlag.søkerErFarEllerMedmor
//             ? !!grunnlag.morHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS
//             : !!grunnlag.farMedmorHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS,
//         kanIkkeOppgis: false,
//     };
// };
