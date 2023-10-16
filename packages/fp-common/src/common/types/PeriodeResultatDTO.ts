import { PeriodeResultatÅrsak } from './PeriodeResultatÅrsak';

export interface PeriodeResultatDTO {
    innvilget: boolean;
    trekkerMinsterett: boolean;
    trekkerDager: boolean;
    årsak: PeriodeResultatÅrsak;
}
