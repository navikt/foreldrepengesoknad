import AnnenForelder from 'app/context/types/AnnenForelder';
import Barn, { isAdoptertAnnetBarn, isAdoptertStebarn, isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';
import Søker from 'app/context/types/Søker';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { Saksgrunnlag } from 'app/types/Saksgrunnlag';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { TilgjengeligeStønadskontoerParams } from './api';

const getStønadskontoParams = (
    dekningsgrad: Dekningsgrad,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    antallBarn: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    erEndringssøknad: boolean,
    barn: Barn,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    søker: Søker,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    annenForelder: AnnenForelder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    grunnlag?: Saksgrunnlag
): TilgjengeligeStønadskontoerParams => {
    return {
        antallBarn: barn.antallBarn,
        startdatoUttak: getFamiliehendelsedato(barn),
        dekningsgrad: dekningsgrad,
        farHarRett: true,
        morHarRett: true,
        morHarAleneomsorg: false,
        farHarAleneomsorg: false,
        fødselsdato: isFødtBarn(barn) ? barn.fødselsdatoer[0] : undefined,
        omsorgsovertakelsesdato: isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn) ? barn.adopsjonsdato : undefined,
        termindato: isFødtBarn(barn) || isUfødtBarn(barn) ? barn.termindato : undefined,
    };
};

export default getStønadskontoParams;

// export const getStønadskontoParams = (
//     søknadsinfo: Søknadsinfo,
//     startdatoPermisjon: Date | undefined,
//     barn: Barn,
//     grunnlag?: Saksgrunnlag
// ): GetTilgjengeligeStønadskontoerParams => {
//     const {
//         søknaden: { familiehendelsesdato, dekningsgrad, antallBarn, erFødsel, erBarnFødt, erEndringssøknad },
//         mor,
//         farMedmor,
//     } = søknadsinfo;

//     if (grunnlag && (skalKunneViseMorsUttaksplanForFarEllerMedmor(grunnlag, søknadsinfo) || erEndringssøknad)) {
//         const params = {
//             antallBarn: grunnlag.antallBarn,
//             fødselsdato: undefined,
//             termindato: undefined,
//             omsorgsovertakelsesdato: undefined,
//             dekningsgrad: grunnlag.dekningsgrad,
//             morHarRett: grunnlag.morHarRett,
//             morHarAleneomsorg: grunnlag.morErAleneOmOmsorg,
//             farHarRett: grunnlag.farMedmorHarRett,
//             farHarAleneomsorg: grunnlag.farMedmorErAleneOmOmsorg,
//             startdatoUttak: startdatoPermisjon || ISOStringToDate(grunnlag.familieHendelseDato)!,
//         };

//         if (erFødsel) {
//             if (erBarnFødt) {
//                 return {
//                     ...params,
//                     termindato: ISOStringToDate(grunnlag.termindato),
//                     fødselsdato: ISOStringToDate((barn as FødtBarn).fødselsdatoer[0]),
//                 };
//             } else {
//                 return { ...params, termindato: ISOStringToDate((barn as UfødtBarn).termindato) };
//             }
//         } else {
//             return { ...params, omsorgsovertakelsesdato: ISOStringToDate((barn as Adopsjonsbarn).adopsjonsdato) };
//         }
//     } else {
//         const params = {
//             antallBarn,
//             fødselsdato: undefined,
//             termindato: undefined,
//             omsorgsovertakelsesdato: undefined,
//             dekningsgrad:
//                 dekningsgrad === Dekningsgrad.ÅTTI_PROSENT ? Dekningsgrad.ÅTTI_PROSENT : Dekningsgrad.HUNDRE_PROSENT,
//             morHarRett: mor.harRett,
//             morHarAleneomsorg: mor.erAleneOmOmsorg,
//             farHarRett: farMedmor.harRett,
//             farHarAleneomsorg: farMedmor.erAleneOmOmsorg,
//             startdatoUttak: startdatoPermisjon || familiehendelsesdato,
//         };

//         if (erFødsel) {
//             if (erBarnFødt) {
//                 return {
//                     ...params,
//                     termindato: ISOStringToDate((barn as FødtBarn).termindato),
//                     fødselsdato: ISOStringToDate((barn as FødtBarn).fødselsdatoer[0]),
//                 };
//             } else {
//                 return { ...params, termindato: ISOStringToDate((barn as UfødtBarn).termindato) };
//             }
//         } else {
//             return { ...params, omsorgsovertakelsesdato: ISOStringToDate((barn as Adopsjonsbarn).adopsjonsdato) };
//         }
//     }
// };
