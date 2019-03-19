import { Regel, Regelgrunnlag, RegelTest } from '../types';
import { regelPasserer, regelHarAvvik } from '../regelUtils';

export const inneholderStønadskontoForMyeUttakTest: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) =>
    grunnlag.uttaksstatusStønadskontoer.filter((u) => u.antallDager < 0).length === 0
        ? regelPasserer(regel)
        : regelHarAvvik(regel);
