import { Periode } from 'uttaksplan/types/Periode';
import { Saksgrunnlag } from './Saksgrunnlag';
import { Saksperiode } from './Saksperiode';

export interface EksisterendeSak {
    erAnnenPartsSak: boolean;
    grunnlag: Saksgrunnlag;
    saksperioder: Saksperiode[];
    uttaksplan: Periode[];
}
