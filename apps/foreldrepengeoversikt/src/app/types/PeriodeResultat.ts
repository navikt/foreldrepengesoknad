import { PeriodeResultatÅrsak } from './PeriodeResultatÅrsak';

export interface PeriodeResultat {
    innvilget: boolean;
    trekkerMinsterett: boolean;
    trekkerDager: boolean;
    årsak: PeriodeResultatÅrsak;
}
