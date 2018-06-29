import { Dekningsgrad, Periode, Periodetype } from '../../types';
import { Uttaksgrunnlag } from 'uttaksplan/utils/uttak/uttaksgrunnlag';
import { Uttaksinfo } from 'uttaksplan/utils/uttak/uttaksinfo';

export type SynligInfoMap = Map<string, boolean>;

export interface UttaksplanFormState {
    dekningsgrad?: Dekningsgrad;
    fellesperiodeukerForelder1: number;
    fellesperiodeukerForelder2: number;
    ukerFellesperiode: number;
}
export type UttaksplanFormStatePartial = Partial<UttaksplanFormState>;

export interface UttaksplanState {
    perioder: Periode[];
    manuellOppdatering: boolean;
    uttaksgrunnlag?: Uttaksgrunnlag;
    uttaksinfo?: Uttaksinfo;
}
export type UttaksplanStatePartial = Partial<UttaksplanState>;

export interface UttaksplanViewState {
    synligInfo: SynligInfoMap;
    visTidslinje: boolean;
    dialogErApen?: boolean;
    valgtPeriode?: {
        periodetype: Periodetype;
        periode?: Periode;
    };
}
export type UttaksplanViewStatePartial = Partial<UttaksplanViewState>;

export interface UttaksplanAppState {
    uttaksplan: {
        form: UttaksplanFormState;
        uttaksplan: UttaksplanState;
        view: UttaksplanViewState;
    };
}
