import { Regel, Regelgrunnlag, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { regelPasserer, regelHarAvvik } from '../regelUtils';

export const inneholderStønadskontoForMyeUttakRegel: Regel = {
    key: RegelKey.inneholderStønadskontoForMyeUttak,
    alvorlighet: RegelAlvorlighet.ULOVLIG,
    test: (regel: Regel, grunnlag: Regelgrunnlag) => {
        return grunnlag.uttaksstatusStønadskontoer.filter((u) => u.antallDager < 0).length === 0
            ? regelPasserer(regel)
            : regelHarAvvik(regel);
    }
};
