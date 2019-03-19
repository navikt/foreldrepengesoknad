import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';
import { uttaksplanGraderingStørreEnnSamtidigUttak } from '../../../util/validation/uttaksplan/uttaksplanGraderingSt\u00F8rreEnnSamtidigUttak';

export const erUttaksplanGraderingStørreEnnSamtidigUttakTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => {
    return uttaksplanGraderingStørreEnnSamtidigUttak(grunnlag.perioder) ? regelHarAvvik(regel) : regelPasserer(regel);
};
