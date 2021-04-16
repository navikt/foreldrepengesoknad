import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { uttaksplanGraderingStørreEnnSamtidigUttak } from '../../../util/validation/uttaksplan/uttaksplanGraderingStørreEnnSamtidigUttak';

export const erUttaksplanGraderingStørreEnnSamtidigUttakTest: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    return { passerer: uttaksplanGraderingStørreEnnSamtidigUttak(grunnlag.perioder) === false };
};
