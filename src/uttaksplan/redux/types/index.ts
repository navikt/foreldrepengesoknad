import {
    Dekningsgrad,
    Permisjonsregler,
    Periode,
    Periodetype
} from '../../types';

export type SynligInfoMap = Map<string, boolean>;

export interface UttaksplanFormState {
    navnForelder1: string | undefined;
    navnForelder2: string | undefined;
    termindato?: Date;
    termindatoErUgyldig?: boolean;
    dekningsgrad?: Dekningsgrad;
    fellesperiodeukerForelder1: number;
    fellesperiodeukerForelder2: number;
    ukerFellesperiode: number;
    permisjonsregler: Permisjonsregler;
}
export type UttaksplanFormStatePartial = Partial<UttaksplanFormState>;

export interface PeriodeState {
    dialogErApen: boolean;
    perioder: Periode[];
    manuellOppdatering: boolean;
    valgtPeriode?: {
        periodetype: Periodetype;
        periode?: Periode;
    };
}
export type PeriodeStatePartial = Partial<PeriodeState>;

export interface UttaksplanViewState {
    synligInfo: SynligInfoMap;
    visTidslinje: boolean;
}
export type UttaksplanViewStatePartial = Partial<UttaksplanViewState>;

export interface UttaksplanState {
    form: UttaksplanFormState;
    periode: PeriodeState;
    view: UttaksplanViewState;
}

export interface UttaksplanAppState {
    uttaksplan: UttaksplanState;
}
