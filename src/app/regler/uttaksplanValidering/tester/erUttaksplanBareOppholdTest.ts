import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';
import { uttaksplanErBareOpphold } from '../../../util/validation/uttaksplan/uttaksplanErBareOpphold';

export const erUttaksplanBanreOppholdTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => {
    return uttaksplanErBareOpphold(grunnlag.perioder) ? regelHarAvvik(regel) : regelPasserer(regel);
};
