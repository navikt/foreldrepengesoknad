import { Regel, Regelgrunnlag, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { regelHarAvvik, regelPasserer } from '../regelUtils';

export const inneholderUttaksplanPerioderRegel: Regel = {
    key: RegelKey.inneholderUttaksplanPerioder,
    alvorlighet: RegelAlvorlighet.ULOVLIG,
    test: (regel: Regel, grunnlag: Regelgrunnlag) => {
        return grunnlag.perioder.length > 0 ? regelPasserer(regel) : regelHarAvvik(regel);
    }
};
