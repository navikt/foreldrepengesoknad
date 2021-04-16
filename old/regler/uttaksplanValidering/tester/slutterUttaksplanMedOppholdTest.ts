import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { uttaksplanSlutterMedOpphold } from '../../../util/validation/uttaksplan/uttaksplanSlutterMedOpphold';

export const slutterUttaksplanMedOppholdTest: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    return { passerer: uttaksplanSlutterMedOpphold(grunnlag.perioder) === false };
};
