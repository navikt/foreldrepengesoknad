import {
    Dekningsgrad,
    Periodetype,
    Periode,
    Permisjonsregler
} from '../../types';
import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from './actionTypes';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

export function setFellesperiodeukerMor(uker: number): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_UKER_FORELDER1,
        uker
    };
}

export function setDekningsgrad(
    dekningsgrad: Dekningsgrad | undefined,
    permisjonsregler: Permisjonsregler
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_DEKNINGSGRAD,
        dekningsgrad,
        permisjonsregler
    };
}

export function visPeriodeDialog(
    periodetype: Periodetype,
    periode?: Periode
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.PERIODE_VIS_DIALOG,
        periode,
        periodetype
    };
}

export function lukkPeriodeDialog(): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.PERIODE_LUKK_DIALOG
    };
}

export function opprettEllerOppdaterPeriode(
    periode: Periode
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.PERIODE_OPPRETT_ELLER_OPPDATER,
        periode
    };
}

export function slettPeriode(periode: Periode): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.PERIODE_SLETT,
        periode
    };
}

export function visInfo(id: string): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.INFO_VIS,
        id
    };
}

export function skjulInfo(id: string): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.INFO_SKJUL,
        id
    };
}

export function visTidslinje(synlig: boolean): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.VIS_TIDSLINJE,
        synlig
    };
}

export function opprettPerioder(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    uttaksgrunnlag: Uttaksgrunnlag,
    fellesukerForelder1: number,
    fellesukerForelder2: number
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.OPPRETT_PERIODER,
        dekningsgrad,
        termindato,
        uttaksgrunnlag,
        fellesukerForelder1,
        fellesukerForelder2
    };
}

export function setManuellUttaksplan(
    manuellUttaksplan: boolean
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_MANUELL_UTTAKSPLAN,
        manuellUttaksplan
    };
}

export function setUttaksgrunnlag(
    uttaksgrunnlag: Uttaksgrunnlag
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_UTTAKSGRUNNLAG,
        uttaksgrunnlag
    };
}

export function dev(key: string): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.DEV_ACTION,
        key
    };
}
