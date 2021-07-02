import { SaksgrunnlagDTO } from './SaksgrunnlagDTO';
import { Saksperiode } from './Saksperiode';

export interface EksisterendeSakDTO {
    grunnlag: SaksgrunnlagDTO;
    perioder: Saksperiode[];
}
