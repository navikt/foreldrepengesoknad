import { SaksperiodeDTO } from './SaksperiodeDTO';
import { DekningsgradDTO } from './DekningsgradDTO';

export interface AnnenPartVedtakDTO {
    perioder: SaksperiodeDTO[];
    dekningsgrad: DekningsgradDTO;
    termindato?: string;
}
