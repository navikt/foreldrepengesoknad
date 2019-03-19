import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';
import { uttaksplanStarterMedOpphold } from '../../../util/validation/uttaksplan/uttaksplanStarterMedOpphold';

export const starterUttaksplanMedOppholdTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => {
    return uttaksplanStarterMedOpphold(grunnlag.perioder) ? regelHarAvvik(regel) : regelPasserer(regel);
};
