import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';

import { uttaksplanGraderingStørreEnnSamtidigUttak } from '../../../util/validation/uttaksplan/uttaksplanGraderingSt\u00F8rreEnnSamtidigUttak';

export const erUttaksplanGraderingStørreEnnSamtidigUttakTest: RegelTest = (
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    return { passerer: uttaksplanGraderingStørreEnnSamtidigUttak(grunnlag.perioder) === false };
};
