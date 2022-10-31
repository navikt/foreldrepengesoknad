import { Periode } from 'uttaksplan/types/Periode';
import { Saksgrunnlag, SaksgrunnlagV2 } from './Saksgrunnlag';
import { Saksperiode, SaksperiodeV2 } from './Saksperiode';

export interface EksisterendeSak {
    erAnnenPartsSak: boolean;
    grunnlag: Saksgrunnlag;
    saksperioder: Saksperiode[];
    uttaksplan: Periode[];
}

export interface EksisterendeSakV2 {
    saksnummer: string;
    erAnnenPartsSak: boolean;
    grunnlag: SaksgrunnlagV2;
    saksperioder: SaksperiodeV2[];
    uttaksplan: Periode[];
}
