import {
    Dekningsgrad,
    Utsettelsesperiode,
    Spraak,
    Periodetype,
    Periode
} from '../../types';

import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from './actionTypes';

export function setNavnForelder1(navn: string): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER1,
        navn
    };
}

export function setNavnForelder2(navn: string): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER2,
        navn
    };
}

export function setTermindato(termindato: Date): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_TERMINDATO,
        termindato
    };
}

export function setFellesperiodeukerMor(uker: number): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_UKER_FORELDER1,
        uker
    };
}

export function setDekningsgrad(
    dekningsgrad: Dekningsgrad | undefined
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_DEKNINGSGRAD,
        dekningsgrad
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
    periode: Utsettelsesperiode
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.PERIODE_OPPRETT_ELLER_OPPDATER,
        periode
    };
}

export function slettPeriode(
    periode: Utsettelsesperiode
): PlanleggerActionTypes {
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

export function setSpraak(spraak: Spraak): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_SPRAAK,
        spraak
    };
}
