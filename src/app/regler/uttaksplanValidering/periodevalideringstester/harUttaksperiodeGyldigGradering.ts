import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { gradertUttaksperiodeErUgyldig } from 'app/util/validation/uttaksplan/uttakGraderingValidation';

export const harUttaksperiodeGyldigGradering: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const ugyldigePerioder = grunnlag.perioder.filter(gradertUttaksperiodeErUgyldig);
    return {
        passerer: ugyldigePerioder.length === 0,
        info: ugyldigePerioder.map((periode) => ({
            periodeId: periode.id
        }))
    };
};
