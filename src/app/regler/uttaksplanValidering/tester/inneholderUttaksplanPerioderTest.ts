import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';

export const inneholderUttaksplanPerioderTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    return { passerer: grunnlag.perioder.length > 0 };
};
