import { UttakPeriodeResultatÅrsak_fpoversikt } from '@navikt/fp-types';

export interface PeriodeResultatDTO {
    innvilget: boolean;
    trekkerMinsterett: boolean;
    trekkerDager: boolean;
    årsak: UttakPeriodeResultatÅrsak_fpoversikt;
}
