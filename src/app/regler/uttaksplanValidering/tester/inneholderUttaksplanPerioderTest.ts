import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { isValidTidsperiode } from '../../../util/uttaksplan/Tidsperioden';

export const inneholderUttaksplanPerioderTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    return { passerer: grunnlag.perioder.filter((periode) => isValidTidsperiode(periode.tidsperiode)).length > 0 };
};
