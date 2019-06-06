import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { uttaksplanErBareOpphold } from '../../../util/validation/uttaksplan/uttaksplanErBareOpphold';

export const erUttaksplanBareOppholdTest: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    return { passerer: uttaksplanErBareOpphold(grunnlag.perioder) === false };
};
