import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Dekningsgrad } from 'common/types';
import { Saksgrunnlag } from 'app/types/EksisterendeSak';
import Barn, { Adopsjonsbarn, FødtBarn, UfødtBarn } from 'app/types/søknad/Barn';
import { GetTilgjengeligeStønadskontoerParams } from '../../api/api';
import { Søknadsinfo } from '../../selectors/types';
import { skalKunneViseMorsUttaksplanForFarEllerMedmor } from './uttakUtils';

export const getStønadskontoParams = (
    søknadsinfo: Søknadsinfo,
    startdatoPermisjon: Date | undefined,
    barn: Barn,
    grunnlag?: Saksgrunnlag
): GetTilgjengeligeStønadskontoerParams => {
    const {
        søknaden: { familiehendelsesdato, dekningsgrad, antallBarn, erFødsel, erBarnFødt, erEndringssøknad },
        mor,
        farMedmor,
    } = søknadsinfo;

    if (grunnlag && (skalKunneViseMorsUttaksplanForFarEllerMedmor(grunnlag, søknadsinfo) || erEndringssøknad)) {
        const params = {
            antallBarn: grunnlag.antallBarn,
            fødselsdato: undefined,
            termindato: undefined,
            omsorgsovertakelsesdato: undefined,
            dekningsgrad: grunnlag.dekningsgrad,
            morHarRett: grunnlag.morHarRett,
            morHarAleneomsorg: grunnlag.morErAleneOmOmsorg,
            farHarRett: grunnlag.farMedmorHarRett,
            farHarAleneomsorg: grunnlag.farMedmorErAleneOmOmsorg,
            startdatoUttak: startdatoPermisjon || ISOStringToDate(grunnlag.familieHendelseDato)!,
        };

        if (erFødsel) {
            if (erBarnFødt) {
                return {
                    ...params,
                    termindato: ISOStringToDate(grunnlag.termindato),
                    fødselsdato: ISOStringToDate((barn as FødtBarn).fødselsdatoer[0]),
                };
            } else {
                return { ...params, termindato: ISOStringToDate((barn as UfødtBarn).termindato) };
            }
        } else {
            return { ...params, omsorgsovertakelsesdato: ISOStringToDate((barn as Adopsjonsbarn).adopsjonsdato) };
        }
    } else {
        const params = {
            antallBarn,
            fødselsdato: undefined,
            termindato: undefined,
            omsorgsovertakelsesdato: undefined,
            dekningsgrad:
                dekningsgrad === Dekningsgrad.ÅTTI_PROSENT ? Dekningsgrad.ÅTTI_PROSENT : Dekningsgrad.HUNDRE_PROSENT,
            morHarRett: mor.harRett,
            morHarAleneomsorg: mor.erAleneOmOmsorg,
            farHarRett: farMedmor.harRett,
            farHarAleneomsorg: farMedmor.erAleneOmOmsorg,
            startdatoUttak: startdatoPermisjon || familiehendelsesdato,
        };

        if (erFødsel) {
            if (erBarnFødt) {
                return {
                    ...params,
                    termindato: ISOStringToDate((barn as FødtBarn).termindato),
                    fødselsdato: ISOStringToDate((barn as FødtBarn).fødselsdatoer[0]),
                };
            } else {
                return { ...params, termindato: ISOStringToDate((barn as UfødtBarn).termindato) };
            }
        } else {
            return { ...params, omsorgsovertakelsesdato: ISOStringToDate((barn as Adopsjonsbarn).adopsjonsdato) };
        }
    }
};
