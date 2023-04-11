import { DekningsgradDTO } from './DekningsgradDTO';
import { Periode } from './Periode';

export interface AnnenPartVedtakDTO {
    antallBarn?: number;
    dekningsgrad: DekningsgradDTO;
    perioder: Periode[];
    termindato?: string;
}
