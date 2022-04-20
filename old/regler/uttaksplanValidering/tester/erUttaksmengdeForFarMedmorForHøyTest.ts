import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { erUttaksmengdeForFarMedmorForHøy } from '../../../util/validation/uttaksplan/erUttaksmengdeForFarMedmorForHøy';

export const erUttaksmengdeForFarMedmorForHøyTest: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    return {
        passerer:
            erUttaksmengdeForFarMedmorForHøy(
                grunnlag.perioder,
                grunnlag.tilgjengeligeStønadskontoer,
                grunnlag.søknadsinfo.søker.erFarEllerMedmor
            ) === false,
    };
};
