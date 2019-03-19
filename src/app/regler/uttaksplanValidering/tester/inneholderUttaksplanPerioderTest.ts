import { Regel, Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { regelHarAvvik, regelPasserer } from '../regelUtils';

export const inneholderUttaksplanPerioderTest: RegelTest = (
    regel: Regel,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    return grunnlag.perioder.length > 0 ? regelPasserer(regel) : regelHarAvvik(regel);
};
