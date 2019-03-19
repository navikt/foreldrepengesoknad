import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';
import { uttaksplanSlutterMedOpphold } from '../../../util/validation/uttaksplan/uttaksplanSlutterMedOpphold';

export const slutterUttaksplanMedOppholdTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => {
    return uttaksplanSlutterMedOpphold(grunnlag.perioder) ? regelHarAvvik(regel) : regelPasserer(regel);
};
