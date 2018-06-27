import {
    Dekningsgrad,
    Periodetype,
    Periode,
    Permisjonsregler
} from '../../types';
import { UttaksplanActionTypes, UttaksplanActionTypeKeys } from './actionTypes';
import {
    Uttaksgrunnlag,
    UttaksplanAppProps
} from 'uttaksplan/types/uttaksgrunnlag';

export function setFellesperiodeukerMor(uker: number): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.SET_UKER_FORELDER1,
        uker
    };
}

export function initUttaksplan(
    props: UttaksplanAppProps,
    dekningsgrad: Dekningsgrad
): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.INIT_UTTAKSPLAN,
        props,
        dekningsgrad
    };
}

export function setDekningsgrad(
    dekningsgrad: Dekningsgrad | undefined,
    permisjonsregler: Permisjonsregler
): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.SET_DEKNINGSGRAD,
        dekningsgrad,
        permisjonsregler
    };
}

export function visPeriodeDialog(
    periodetype: Periodetype,
    periode?: Periode
): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.PERIODE_VIS_DIALOG,
        periode,
        periodetype
    };
}

export function lukkPeriodeDialog(): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.PERIODE_LUKK_DIALOG
    };
}

export function opprettEllerOppdaterPeriode(
    periode: Periode
): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.PERIODE_OPPRETT_ELLER_OPPDATER,
        periode
    };
}

export function slettPeriode(periode: Periode): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.PERIODE_SLETT,
        periode
    };
}

export function visInfo(id: string): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.INFO_VIS,
        id
    };
}

export function skjulInfo(id: string): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.INFO_SKJUL,
        id
    };
}

export function visTidslinje(synlig: boolean): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.VIS_TIDSLINJE,
        synlig
    };
}

export function opprettPerioderForToForeldre(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    uttaksgrunnlag: Uttaksgrunnlag,
    fellesukerForelder1: number,
    fellesukerForelder2: number
): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.OPPRETT_PERIODER_TO_FORELDRE,
        dekningsgrad,
        termindato,
        uttaksgrunnlag,
        fellesukerForelder1,
        fellesukerForelder2
    };
}
export function opprettPerioderAleneomsorg(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    uttaksgrunnlag: Uttaksgrunnlag
): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.OPPRETT_PERIODER_ALENEOMSORG,
        dekningsgrad,
        termindato,
        uttaksgrunnlag
    };
}

export function setManuellUttaksplan(
    manuellUttaksplan: boolean
): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.SET_MANUELL_UTTAKSPLAN,
        manuellUttaksplan
    };
}

export function setUttaksgrunnlag(
    uttaksgrunnlag: Uttaksgrunnlag
): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.SET_UTTAKSGRUNNLAG,
        uttaksgrunnlag
    };
}

export function dev(key: string): UttaksplanActionTypes {
    return {
        type: UttaksplanActionTypeKeys.DEV_ACTION,
        key
    };
}
