import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { uttaksplanStarterMedOpphold } from '../../../util/validation/uttaksplan/uttaksplanStarterMedOpphold';

export const starterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    return { passerer: uttaksplanStarterMedOpphold(grunnlag.perioder) === false };
};
