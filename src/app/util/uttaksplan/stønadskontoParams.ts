import { GetTilgjengeligeStønadskontoerParams } from '../../api/api';
import { Søknadsinfo } from '../../selectors/types';

export const getStønadskontoParams = (
    søknadsinfo: Søknadsinfo,
    startdatoPermisjon: Date | undefined
): GetTilgjengeligeStønadskontoerParams => {
    const {
        søknaden: { familiehendelsesdato, dekningsgrad, antallBarn, erFødsel },
        mor,
        farMedmor
    } = søknadsinfo;
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
};
