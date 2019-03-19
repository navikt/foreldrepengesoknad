import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { erUttaksmengdeForFarMedmorForHøy } from '../../../util/validation/uttaksplan/erUttaksmengdeForFarMedmorForHøy';

export const erUttaksmengdeForFarMedmorForHøyTestTestTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    return {
        passerer:
            erUttaksmengdeForFarMedmorForHøy(
                grunnlag.perioder,
                grunnlag.tilgjengeligeStønadskontoer,
                grunnlag.søknadsinfo.søker.erFarEllerMedmor
            ) === false
    };
};
