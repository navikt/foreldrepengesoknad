import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelHarAvvik, regelPasserer } from '../regelUtils';

export const inneholderUttaksplanPerioderTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => {
    return grunnlag.perioder.length > 0 ? regelPasserer(regel) : regelHarAvvik(regel);
};
