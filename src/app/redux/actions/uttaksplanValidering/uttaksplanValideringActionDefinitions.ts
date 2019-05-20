import { ValidertPeriode } from '../../reducers/uttaksplanValideringReducer';
import { UttaksplanRegelTestresultat } from '../../../regler/uttaksplanValidering/types';

export enum UttaksplanValideringActionKeys {
    'SET_UTTAKSPLAN_VALIDERING' = 'setUttaksplanValidering',
    'VALIDER_UTTAKSPLAN' = 'validerUttaksplan',
    'RESET_UTTAKSPLANVALIDERING' = 'resetUttaksplanvalidering'
}

export interface ValiderUttaksplanAction {
    type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN;
}
export interface SetUttaksplanValidering {
    type: UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING;
    regelTestresultat: UttaksplanRegelTestresultat | undefined;
    validertePerioder: { [periodeId: string]: ValidertPeriode };
}

export interface ResetUttaksplanValidering {
    type: UttaksplanValideringActionKeys.RESET_UTTAKSPLANVALIDERING;
}

export type UttaksplanValideringActionTypes =
    | SetUttaksplanValidering
    | ValiderUttaksplanAction
    | ResetUttaksplanValidering;
