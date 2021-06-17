import { Saksgrunnlag } from './Saksgrunnlag';
import { Saksperiode } from './Saksperiode';

export interface EksisterendeSak {
    grunnlag: Saksgrunnlag;
    saksperioder: Saksperiode[];
}
