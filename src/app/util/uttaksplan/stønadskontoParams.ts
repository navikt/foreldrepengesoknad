import { GetTilgjengeligeStønadskontoerParams } from '../../api/api';
import { Søknadsinfo } from '../../selectors/types';
import { Uttaksgrunnlag } from 'app/types/EksisterendeUttak';

export const getStønadskontoParams = (
    søknadsinfo: Søknadsinfo,
    startdatoPermisjon: Date | undefined,
    grunnlag?: Uttaksgrunnlag
): GetTilgjengeligeStønadskontoerParams => {
    const {
        søknaden: { familiehendelsesdato, dekningsgrad, antallBarn, erFødsel },
        mor,
        farMedmor
    } = søknadsinfo;

    if (grunnlag) {
        return {
            antallBarn: grunnlag.antallBarn,
            familiehendelsesdato: grunnlag.familieHendelseDato,
            dekningsgrad: grunnlag.dekningsgrad,
            morHarRett: grunnlag.morHarRett,
            morHarAleneomsorg: grunnlag.morErAleneOmOmsorg,
            farHarRett: grunnlag.farMedmorHarRett,
            farHarAleneomsorg: grunnlag.farMedmorErAleneOmOmsorg,
            erFødsel,
            startdatoUttak: startdatoPermisjon || grunnlag.familieHendelseDato
        };
    } else {
        return {
            antallBarn,
            familiehendelsesdato,
            dekningsgrad: dekningsgrad === '80' ? '80' : '100',
            morHarRett: mor.harRett,
            morHarAleneomsorg: mor.erAleneOmOmsorg,
            farHarRett: farMedmor.harRett,
            farHarAleneomsorg: farMedmor.erAleneOmOmsorg,
            erFødsel,
            startdatoUttak: startdatoPermisjon || familiehendelsesdato
        };
    }
};
