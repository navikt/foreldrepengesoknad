import { SaksperiodeDTOV2 } from '../SaksperiodeDTO';
import { DekningsgradV2DTO } from './Dekningsgradv2DTO';

export interface AnnenPartsVedtakDTO {
    perioder: SaksperiodeDTOV2[];
    dekningsgrad: DekningsgradV2DTO;
    termindato?: string;
}
