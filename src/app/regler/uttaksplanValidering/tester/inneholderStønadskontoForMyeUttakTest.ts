import { Regel, Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';

export const inneholderStønadskontoForMyeUttakTest: RegelTest = (
    regel: Regel,
    grunnlag: Regelgrunnlag
): RegelTestresultat =>
    grunnlag.uttaksstatusStønadskontoer.filter((u) => u.antallDager < 0).length > 0
        ? regelHarAvvik(regel)
        : regelPasserer(regel);
