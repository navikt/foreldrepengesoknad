import { ValidertPeriode } from '../../reducers/uttaksplanValideringReducer';

export enum UttaksplanValideringActionKeys {
    'SET_UTTAKSPLAN_VALIDERING' = 'setUttaksplanValidering',
    'VALIDER_UTTAKSPLAN' = 'validerUttaksplan'
}

export interface ValiderUttaksplanAction {
    type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN;
}
export interface SetUttaksplanValidering {
    type: UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING;
    validertePerioder: { [periodeId: string]: ValidertPeriode };
    inneholderPerioder: boolean;
}

export type UttaksplanValideringActionTypes = SetUttaksplanValidering | ValiderUttaksplanAction;
