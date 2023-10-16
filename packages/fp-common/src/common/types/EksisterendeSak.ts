import { Periode } from 'uttaksplan/types/Periode';
import { Saksperiode } from './Saksperiode';
import { Saksgrunnlag } from './Saksgrunnlag';

export interface EksisterendeSak {
    saksnummer: string;
    erAnnenPartsSak: boolean;
    grunnlag: Saksgrunnlag;
    saksperioder: Saksperiode[];
    uttaksplan: Periode[];
}
