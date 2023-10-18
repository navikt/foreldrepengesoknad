import { Saksperiode } from './Saksperiode';
import { Saksgrunnlag } from './Saksgrunnlag';
import { Periode } from './Periode';

export interface EksisterendeSak {
    saksnummer: string;
    erAnnenPartsSak: boolean;
    grunnlag: Saksgrunnlag;
    saksperioder: Saksperiode[];
    uttaksplan: Periode[];
}
