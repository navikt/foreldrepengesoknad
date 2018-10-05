import { ValidertPeriode } from '../../reducers/uttaksplanValideringReducer';

export enum UttaksplanValideringActionKeys {
    'SET_VALIDERT_PERIODE' = 'setValidertPeriode',
    'SET_VALIDERTE_PERIODER' = 'setValidertePerioder',
    'VALIDER_UTTAKSPLAN' = 'validerUttaksplan'
}

export interface ValiderUttaksplanAction {
    type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN;
}

export interface SetValidertPeriode {
    type: UttaksplanValideringActionKeys.SET_VALIDERT_PERIODE;
    periodeId: string;
    validertPeriode: ValidertPeriode;
}

export interface SetValidertePerioder {
    type: UttaksplanValideringActionKeys.SET_VALIDERTE_PERIODER;
    validertePerioder: { [periodeId: string]: ValidertPeriode };
}

export type UttaksplanValideringActionTypes = SetValidertPeriode | SetValidertePerioder | ValiderUttaksplanAction;
