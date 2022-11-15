import { SaksperiodeDTO } from './SaksperiodeDTO';
import { DekningsgradDTO } from './DekningsgradDTO';

export interface AnnenPartsVedtakDTO {
    perioder: SaksperiodeDTO[];
    dekningsgrad: DekningsgradDTO;
    termindato?: string;
}
