import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { isValidTidsperiode } from '../../../util/uttaksplan/Tidsperioden';

export const inneholderUttaksplanPerioderTest: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    return { passerer: grunnlag.perioder.filter((periode) => isValidTidsperiode(periode.tidsperiode)).length > 0 };
};
