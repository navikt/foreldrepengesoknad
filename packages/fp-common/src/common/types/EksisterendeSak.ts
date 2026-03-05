import { Periode } from './Periode';
import { Saksgrunnlag } from './Saksgrunnlag';
import { Saksperiode } from './Saksperiode';

export interface EksisterendeSak {
    saksnummer: string;
    erAnnenPartsSak: boolean;
    grunnlag: Saksgrunnlag;
    saksperioder: Saksperiode[];
    uttaksplan: Periode[];
}
