import {
    BrukerRolleSak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { PeriodeHullType } from './Planperiode';

export type UttaksplanHull = {
    fom: string;
    tom: string;
    hullType: PeriodeHullType;
    forelder?: BrukerRolleSak_fpoversikt;
};

export type Uttaksplanperiode = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt | UttaksplanHull;

export const erVanligUttakPeriode = (p: Uttaksplanperiode): p is UttakPeriode_fpoversikt =>
    !('trekkdager' in p) && !('hullType' in p);

export const erEøsUttakPeriode = (p: Uttaksplanperiode): p is UttakPeriodeAnnenpartEøs_fpoversikt => 'trekkdager' in p;

export const erUttaksplanHull = (p: Uttaksplanperiode): p is UttaksplanHull => 'hullType' in p;
