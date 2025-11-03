import { UttakPeriodeResultatÅrsak_fpoversikt } from './fpoversiktDtoGenerert';

export interface PeriodeResultat {
    innvilget: boolean;
    trekkerMinsterett: boolean;
    trekkerDager: boolean;
    årsak: UttakPeriodeResultatÅrsak_fpoversikt;
}
