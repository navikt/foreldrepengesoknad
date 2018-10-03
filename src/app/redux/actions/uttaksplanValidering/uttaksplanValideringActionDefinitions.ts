import { PeriodeValideringsfeil } from '../../reducers/uttaksplanValideringReducer';
import { Periode } from '../../../types/uttaksplan/periodetyper';

export enum UttaksplanValideringActionKeys {
    'SET_VALIDERT_PERIODE' = 'setValidertPeriode',
    'SET_VALIDERTE_PERIODER' = 'setValidertePerioder',
    'VALIDER_UTTAKSPLAN' = 'validerUttaksplan'
}

export interface ValidertPeriode {
    valideringsfeil: PeriodeValideringsfeil[];
    overlappendePerioder: Periode[];
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
