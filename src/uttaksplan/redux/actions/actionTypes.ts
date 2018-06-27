import {
    Dekningsgrad,
    Periode,
    Periodetype,
    Permisjonsregler
} from '../../types';
import {
    Uttaksgrunnlag,
    UttaksplanAppProps
} from 'uttaksplan/types/uttaksgrunnlag';

export enum UttaksplanActionTypeKeys {
    'INIT_UTTAKSPLAN' = 'initUttaksplan',
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
    'OPPRETT_PERIODER_TO_FORELDRE' = 'opprettPerioderToForeldre',
    'OPPRETT_PERIODER_ALENEOMSORG' = 'opprettPerioderAleneomsorg',
    'SET_MANUELL_UTTAKSPLAN' = 'manuellUttaksplan',
    'SET_UTTAKSGRUNNLAG' = 'setUttaksgrunnlag',
    'DEV_ACTION' = 'dev'
}

export type UttaksplanActionTypes =
    | InitUttaksplan
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
    | OpprettPerioderToForeldre
    | OpprettPerioderAleneomsorg
    | ManuellUttaksplanAction
    | SetUttaksgrunnlag
    | DevAction;

export interface InitUttaksplan {
    type: UttaksplanActionTypeKeys.INIT_UTTAKSPLAN;
    props: UttaksplanAppProps;
    dekningsgrad: Dekningsgrad;
}
export interface OpprettPerioderToForeldre {
    type: UttaksplanActionTypeKeys.OPPRETT_PERIODER_TO_FORELDRE;
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    uttaksgrunnlag: Uttaksgrunnlag;
    fellesukerForelder1: number;
    fellesukerForelder2: number;
}

export interface OpprettPerioderAleneomsorg {
    type: UttaksplanActionTypeKeys.OPPRETT_PERIODER_ALENEOMSORG;
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    uttaksgrunnlag: Uttaksgrunnlag;
}

export interface SetUkerForelder1 {
    type: UttaksplanActionTypeKeys.SET_UKER_FORELDER1;
    uker: number;
}

export interface SetUkerForelder2 {
    type: UttaksplanActionTypeKeys.SET_UKER_FORELDER2;
    uker: number;
}

export interface SetDekningsgrad {
    type: UttaksplanActionTypeKeys.SET_DEKNINGSGRAD;
    dekningsgrad: Dekningsgrad | undefined;
    permisjonsregler: Permisjonsregler;
}

export interface PeriodeVisDialog {
    type: UttaksplanActionTypeKeys.PERIODE_VIS_DIALOG;
    periodetype: Periodetype;
    periode?: Periode;
}

export interface PeriodeLukkDialog {
    type: UttaksplanActionTypeKeys.PERIODE_LUKK_DIALOG;
}

export interface OpprettEllerOppdaterPeriode {
    type: UttaksplanActionTypeKeys.PERIODE_OPPRETT_ELLER_OPPDATER;
    periode: Periode;
}

export interface SlettPeriode {
    type: UttaksplanActionTypeKeys.PERIODE_SLETT;
    periode: Periode;
}

export interface SkjulInfo {
    type: UttaksplanActionTypeKeys.INFO_SKJUL;
    id: string;
}
export interface VisInfo {
    type: UttaksplanActionTypeKeys.INFO_VIS;
    id: string;
}
export interface VisTidslinje {
    type: UttaksplanActionTypeKeys.VIS_TIDSLINJE;
    synlig: boolean;
}
export interface DevAction {
    type: UttaksplanActionTypeKeys.DEV_ACTION;
    key: string;
}
export interface ManuellUttaksplanAction {
    type: UttaksplanActionTypeKeys.SET_MANUELL_UTTAKSPLAN;
    manuellUttaksplan: boolean;
}

export interface SetUttaksgrunnlag {
    type: UttaksplanActionTypeKeys.SET_UTTAKSGRUNNLAG;
    uttaksgrunnlag: Uttaksgrunnlag;
}
