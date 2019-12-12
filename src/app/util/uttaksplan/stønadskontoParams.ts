import { GetTilgjengeligeStønadskontoerParams } from '../../api/api';
import { Søknadsinfo } from '../../selectors/types';
import { Saksgrunnlag } from 'app/types/EksisterendeSak';
import Barn, { FødtBarn, UfødtBarn, Adopsjonsbarn } from 'app/types/søknad/Barn';
import { Dekningsgrad } from 'common/types';
import { skalKunneViseMorsUttaksplanForFarEllerMedmor } from './uttakUtils';

export const getStønadskontoParams = (
    søknadsinfo: Søknadsinfo,
    startdatoPermisjon: Date | undefined,
    barn: Barn,
    grunnlag?: Saksgrunnlag
): GetTilgjengeligeStønadskontoerParams => {
    const {
        søknaden: { familiehendelsesdato, dekningsgrad, antallBarn, erFødsel, erBarnFødt },
        mor,
        farMedmor
    } = søknadsinfo;

    if (grunnlag && skalKunneViseMorsUttaksplanForFarEllerMedmor(grunnlag, søknadsinfo)) {
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
            startdatoUttak: startdatoPermisjon || grunnlag.familieHendelseDato
        };

        if (erFødsel) {
            if (erBarnFødt) {
                return {
                    ...params,
                    termindato: grunnlag.termindato,
                    fødselsdato: (barn as FødtBarn).fødselsdatoer[0]
                };
            } else {
                return { ...params, termindato: (barn as UfødtBarn).termindato };
            }
        } else {
            return { ...params, omsorgsovertakelsesdato: (barn as Adopsjonsbarn).adopsjonsdato };
        }
    } else {
        const params = {
            antallBarn,
            fødselsdato: undefined,
            termindato: undefined,
            omsorgsovertakelsesdato: undefined,
            dekningsgrad: (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT ? Dekningsgrad.ÅTTI_PROSENT : Dekningsgrad.HUNDRE_PROSENT) as Dekningsgrad,
            morHarRett: mor.harRett,
            morHarAleneomsorg: mor.erAleneOmOmsorg,
            farHarRett: farMedmor.harRett,
            farHarAleneomsorg: farMedmor.erAleneOmOmsorg,
            startdatoUttak: startdatoPermisjon || familiehendelsesdato
        };

        if (erFødsel) {
            if (erBarnFødt) {
                return {
                    ...params,
                    termindato: (barn as FødtBarn).termindato,
                    fødselsdato: (barn as FødtBarn).fødselsdatoer[0]
                };
            } else {
                return { ...params, termindato: (barn as UfødtBarn).termindato };
            }
        } else {
            return { ...params, omsorgsovertakelsesdato: (barn as Adopsjonsbarn).adopsjonsdato };
        }
    }
};
