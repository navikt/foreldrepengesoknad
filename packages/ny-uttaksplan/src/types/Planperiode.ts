import {
    BrukerRolleSak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

export enum PeriodeHullType {
    PERIODE_UTEN_UTTAK = 'Periode uten uttak',
    TAPTE_DAGER = 'Tapte dager',
}

export interface PlanperiodeVanlig extends UttakPeriode_fpoversikt {
    erAnnenPartEøs: false;
    periodeHullÅrsak?: PeriodeHullType;
    skalIkkeHaUttakFørTermin?: boolean;
    id: string;
    readOnly: boolean;
}

interface PlanperiodeAnnenpartEøs extends UttakPeriodeAnnenpartEøs_fpoversikt {
    erAnnenPartEøs: true;
    periodeHullÅrsak?: PeriodeHullType;
    skalIkkeHaUttakFørTermin?: boolean;
    id: string;
    readOnly: boolean;
    forelder?: BrukerRolleSak_fpoversikt; // Skal denne komme med fra backend?
}

export type Planperiode = PlanperiodeVanlig | PlanperiodeAnnenpartEøs;
