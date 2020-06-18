import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { gradertUttaksperiodeErUgyldig } from 'app/util/validation/uttaksplan/uttakGraderingValidation';

export const harUttaksperiodeGyldigGradering: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const ugyldigePerioder = grunnlag.perioder.filter(gradertUttaksperiodeErUgyldig);
    return {
        passerer: ugyldigePerioder.length === 0,
        info: ugyldigePerioder.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
