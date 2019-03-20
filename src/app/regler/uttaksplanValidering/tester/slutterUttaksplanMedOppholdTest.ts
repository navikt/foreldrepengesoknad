import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { uttaksplanSlutterMedOpphold } from '../../../util/validation/uttaksplan/uttaksplanSlutterMedOpphold';

export const slutterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    return { passerer: uttaksplanSlutterMedOpphold(grunnlag.perioder) === false };
};
