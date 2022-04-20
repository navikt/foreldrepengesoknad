import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { uttaksplanStarterMedOpphold } from '../../../util/validation/uttaksplan/uttaksplanStarterMedOpphold';

export const starterUttaksplanMedOppholdTest: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    if (grunnlag.søknadsinfo.søknaden.erEndringssøknad) {
        return { passerer: true };
    }

    return { passerer: uttaksplanStarterMedOpphold(grunnlag.perioder) === false };
};
