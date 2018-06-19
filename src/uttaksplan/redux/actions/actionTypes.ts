import {
    Dekningsgrad,
    Periode,
    Periodetype,
    Permisjonsregler
} from '../../types';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

export enum PlanleggerActionTypeKeys {
    'SET_UKER_FORELDER1' = 'setUkerForelder1',
    'SET_UKER_FORELDER2' = 'setUkerForelder2',
    'SET_DEKNINGSGRAD' = 'setDekningsgrad',
    'PERIODE_VIS_DIALOG' = 'periodeVisDialog',
    'PERIODE_LUKK_DIALOG' = 'periodeLukkDialog',
    'PERIODE_OPPRETT_ELLER_OPPDATER' = 'periodeOpprettEllerOppdater',
    'PERIODE_SLETT' = 'periodeSlett',
    'INFO_VIS' = 'infoVis',
    'INFO_SKJUL' = 'infoSkjul',
    'VIS_TIDSLINJE' = 'visTidslinje',
    'OPPRETT_PERIODER' = 'opprettPerioder',
    'SET_MANUELL_UTTAKSPLAN' = 'manuellUttaksplan',
    'SET_UTTAKSGRUNNLAG' = 'setUttaksgrunnlag',
    'DEV_ACTION' = 'dev'
}

export type PlanleggerActionTypes =
    | SetUkerForelder2
    | SetUkerForelder1
    | SetDekningsgrad
    | PeriodeVisDialog
    | PeriodeLukkDialog
    | OpprettEllerOppdaterPeriode
    | SlettPeriode
    | SkjulInfo
    | VisInfo
    | VisTidslinje
    | OpprettPerioder
    | ManuellUttaksplanAction
    | SetUttaksgrunnlag
    | DevAction;

export interface OpprettPerioder {
    type: PlanleggerActionTypeKeys.OPPRETT_PERIODER;
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    uttaksgrunnlag: Uttaksgrunnlag;
    fellesukerForelder1: number;
    fellesukerForelder2: number;
}

export interface SetUkerForelder1 {
    type: PlanleggerActionTypeKeys.SET_UKER_FORELDER1;
    uker: number;
}

export interface SetUkerForelder2 {
    type: PlanleggerActionTypeKeys.SET_UKER_FORELDER2;
    uker: number;
}

export interface SetDekningsgrad {
    type: PlanleggerActionTypeKeys.SET_DEKNINGSGRAD;
    dekningsgrad: Dekningsgrad | undefined;
    permisjonsregler: Permisjonsregler;
}

export interface PeriodeVisDialog {
    type: PlanleggerActionTypeKeys.PERIODE_VIS_DIALOG;
    periodetype: Periodetype;
    periode?: Periode;
}

export interface PeriodeLukkDialog {
    type: PlanleggerActionTypeKeys.PERIODE_LUKK_DIALOG;
}

export interface OpprettEllerOppdaterPeriode {
    type: PlanleggerActionTypeKeys.PERIODE_OPPRETT_ELLER_OPPDATER;
    periode: Periode;
}

export interface SlettPeriode {
    type: PlanleggerActionTypeKeys.PERIODE_SLETT;
    periode: Periode;
}

export interface SkjulInfo {
    type: PlanleggerActionTypeKeys.INFO_SKJUL;
    id: string;
}
export interface VisInfo {
    type: PlanleggerActionTypeKeys.INFO_VIS;
    id: string;
}
export interface VisTidslinje {
    type: PlanleggerActionTypeKeys.VIS_TIDSLINJE;
    synlig: boolean;
}
export interface DevAction {
    type: PlanleggerActionTypeKeys.DEV_ACTION;
    key: string;
}
export interface ManuellUttaksplanAction {
    type: PlanleggerActionTypeKeys.SET_MANUELL_UTTAKSPLAN;
    manuellUttaksplan: boolean;
}

export interface SetUttaksgrunnlag {
    type: PlanleggerActionTypeKeys.SET_UTTAKSGRUNNLAG;
    uttaksgrunnlag: Uttaksgrunnlag;
}
