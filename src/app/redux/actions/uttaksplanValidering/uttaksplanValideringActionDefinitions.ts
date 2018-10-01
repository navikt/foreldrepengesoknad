import { Periode } from '../../../types/uttaksplan/periodetyper';
import { PeriodeValideringsfeil } from '../../reducers/uttaksplanValideringReducer';

export enum UttaksplanValideringActionKeys {
    'SET_VALIDERT_PERIODE' = 'setValidertPeriode',
    'SET_VALIDERTE_PERIODER' = 'setValidertePerioder',
    'VALIDER_UTTAKSPLAN' = 'validerUttaksplan'
}

export interface ValiderPeriodePayload {
    perioder: Periode[];
}

export interface ValidertPeriode {
    periodeId: string;
    valideringsfeil: PeriodeValideringsfeil[] | undefined;
}

export interface ValiderUttaksplanAction {
    type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN;
}

export interface SetValidertPeriode {
    type: UttaksplanValideringActionKeys.SET_VALIDERT_PERIODE;
    validertPeriode: ValidertPeriode;
}

export interface SetValidertePerioder {
    type: UttaksplanValideringActionKeys.SET_VALIDERTE_PERIODER;
    validertePerioder: ValidertPeriode[];
}

export type UttaksplanValideringActionTypes = SetValidertPeriode | SetValidertePerioder | ValiderUttaksplanAction;
