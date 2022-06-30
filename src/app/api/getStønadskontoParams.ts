import { dateToISOString } from '@navikt/sif-common-formik/lib';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Barn, { isAdoptertAnnetBarn, isAdoptertStebarn, isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { andreAugust2022ReglerGjelder, ISOStringToDate } from 'app/utils/dateUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { TilgjengeligeStønadskontoerParams } from './api';

const getFarHarRett = (erFarMedmor: boolean, annenForelder: AnnenForelder) => {
    if (erFarMedmor) {
        return true;
    }

    if (isAnnenForelderOppgitt(annenForelder)) {
        return !!annenForelder.harRettPåForeldrepenger;
    }

    return false;
};

const getMorHarRett = (erFarMedmor: boolean, annenForelder: AnnenForelder) => {
    if (!erFarMedmor) {
        return true;
    }

    if (isAnnenForelderOppgitt(annenForelder)) {
        return !!annenForelder.harRettPåForeldrepenger;
    }

    return false;
};

const getTermindatoSomSkalBrukes = (barn: Barn, termindatoSaksgrunnlag?: string) => {
    if (isFødtBarn(barn) || isUfødtBarn(barn)) {
        return termindatoSaksgrunnlag ? termindatoSaksgrunnlag : dateToISOString(barn.termindato);
    }

    return undefined;
};

const getStønadskontoParams = (
    dekningsgrad: Dekningsgrad,
    barn: Barn,
    annenForelder: AnnenForelder,
    søkersituasjon: Søkersituasjon,
    farHarAleneomsorg: boolean,
    morHarAleneomsorg: boolean,
    oppgittTermindato?: string
): TilgjengeligeStønadskontoerParams => {
    const erFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    return {
        antallBarn: barn.antallBarn.toString(),
        startdatoUttak: getFamiliehendelsedato(barn),
        dekningsgrad: dekningsgrad,
        farHarRett: getFarHarRett(erFarMedmor, annenForelder),
        morHarRett: getMorHarRett(erFarMedmor, annenForelder),
        morHarAleneomsorg,
        farHarAleneomsorg,
        fødselsdato: isFødtBarn(barn) ? dateToISOString(barn.fødselsdatoer[0]) : undefined,
        omsorgsovertakelsesdato:
            isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn) ? dateToISOString(barn.adopsjonsdato) : undefined,
        termindato: getTermindatoSomSkalBrukes(barn, oppgittTermindato),
        minsterett: andreAugust2022ReglerGjelder(familiehendelsesdato!),
        erMor: !søkerErFarEllerMedmor,
        morHarUføretrygd: getErMorUfør(annenForelder, søkerErFarEllerMedmor),
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
