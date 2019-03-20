import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { erUttaksmengdeForFarMedmorForHøy } from '../../../util/validation/uttaksplan/erUttaksmengdeForFarMedmorForHøy';

export const erUttaksmengdeForFarMedmorForHøyTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    return {
        passerer:
            erUttaksmengdeForFarMedmorForHøy(
                grunnlag.perioder,
                grunnlag.tilgjengeligeStønadskontoer,
                grunnlag.søknadsinfo.søker.erFarEllerMedmor
            ) === false
    };
};
