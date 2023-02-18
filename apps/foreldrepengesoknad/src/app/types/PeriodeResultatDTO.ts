import { PeriodeResultatÅrsak } from 'uttaksplan/types/PeriodeResultatÅrsak';

export interface PeriodeResultatDTO {
    innvilget: boolean;
    trekkerMinsterett: boolean;
    trekkerDager: boolean;
    årsak: PeriodeResultatÅrsak;
}
