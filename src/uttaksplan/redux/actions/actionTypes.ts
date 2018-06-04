import {
    Dekningsgrad,
    Periode,
    Periodetype,
    Permisjonsregler
} from '../../types';

export enum PlanleggerActionTypeKeys {
    'SET_NAVN_FORELDER1' = 'setNavnForelder1',
    'SET_NAVN_FORELDER2' = 'setNavnForelder2',
    'SET_TERMINDATO' = 'setTermindato',
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
    'OPPRETT_PERIODER' = 'opprettPerioder'
}

export type PlanleggerActionTypes =
    | SetNavnForelder1
    | SetNavnForelder2
    | SetTermindato
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
    | OpprettPerioder;

export interface OpprettPerioder {
    type: PlanleggerActionTypeKeys.OPPRETT_PERIODER;
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    fellesukerForelder1: number;
    fellesukerForelder2: number;
    permisjonsregler: Permisjonsregler;
}
export interface SetNavnForelder1 {
    type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER1;
    navn: string;
}

export interface SetNavnForelder2 {
    type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER2;
    navn: string;
}

export interface SetTermindato {
    type: PlanleggerActionTypeKeys.SET_TERMINDATO;
    termindato: Date;
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
