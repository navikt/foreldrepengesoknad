import { RegelTest, Regel, Regelgrunnlag, RegelTestresultat, RegelAlvorlighet } from '../uttaksplanValidering/types';
import { RegelKey } from '../uttaksplanValidering/regelKeys';
import { regelHarAvvik, regelPasserer } from '../uttaksplanValidering/regelUtils';

const inneholderUttaksplanPerioder: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    return perioder.length === 0 ? regelHarAvvik(regel) : regelPasserer(regel);
};

export const uttaksplanInneholderPerioderRegel: Regel = {
    key: RegelKey.inneholderUttaksplanPerioder,
    alvorlighet: RegelAlvorlighet.ULOVLIG,
    test: inneholderUttaksplanPerioder
};
