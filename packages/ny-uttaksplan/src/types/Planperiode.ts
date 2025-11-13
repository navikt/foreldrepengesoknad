import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

export enum PeriodeHullType {
    PERIODE_UTEN_UTTAK = 'Periode uten uttak',
    TAPTE_DAGER = 'Tapte dager',
}

export interface Planperiode extends UttakPeriode_fpoversikt {
    periodeHullÅrsak?: PeriodeHullType;
    skalIkkeHaUttakFørTermin?: boolean;
    id: string;
    readOnly: boolean;
}
