import { SaksgrunnlagDTO } from './SaksgrunnlagDTO';
import { SaksperiodeDTO } from './SaksperiodeDTO';

export interface EksisterendeSakDTO {
    grunnlag: SaksgrunnlagDTO;
    perioder: SaksperiodeDTO[];
}
