import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

export enum PeriodeHullType {
    PERIODE_UTEN_UTTAK = 'Periode uten uttak',
    TAPTE_DAGER = 'Tapte dager',
}

export interface PlanperiodeVanlig extends UttakPeriode_fpoversikt {
    erAnnenPartEøs: false;
    // TODO (TOR) Ein "hull-periode" er vel kun ein visningsperiode, og treng ikkje arva frå UttakPeriode_fpoversikt? Og kva er Permisjonsperiode?
    periodeHullÅrsak?: PeriodeHullType;
    // TODO (TO) Ser ut som denne kun blir brukt ein stad, i sortering. Kan ein heller utleda denne i sorteringsfunksjonen?
    skalIkkeHaUttakFørTermin?: boolean;
}

interface PlanperiodeAnnenpartEøs extends UttakPeriodeAnnenpartEøs_fpoversikt {
    erAnnenPartEøs: true;
    periodeHullÅrsak?: PeriodeHullType;
    skalIkkeHaUttakFørTermin?: boolean;
}

export type Planperiode = PlanperiodeVanlig | PlanperiodeAnnenpartEøs;
