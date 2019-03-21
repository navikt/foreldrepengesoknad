import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';

import { uttaksplanGraderingStørreEnnSamtidigUttak } from '../../../util/validation/uttaksplan/uttaksplanGraderingStørreEnnSamtidigUttak';

export const erUttaksplanGraderingStørreEnnSamtidigUttakTest: RegelTest = (
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    return { passerer: uttaksplanGraderingStørreEnnSamtidigUttak(grunnlag.perioder) === false };
};
