import { Dekningsgrad, Utsettelsesperiode, Spraak } from '../../types';

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

export function settAntallDagerMor(uker: number): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_UKER_FORELDER1,
        uker
    };
}

export function settAntallDagerMedforelder(
    uker: number
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.SET_UKER_FORELDER2,
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

export function utsettelseVisDialog(
    utsettelse?: Utsettelsesperiode
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG,
        utsettelse
    };
}

export function utsettelseLukkDialog(): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG
    };
}

export function opprettEllerOppdaterUtsettelse(
    utsettelse: Utsettelsesperiode
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.UTSETTELSE_OPPRETT_ELLER_OPPDATER,
        utsettelse
    };
}

export function slettUtsettelse(
    utsettelse: Utsettelsesperiode
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.UTSETTELSE_SLETT,
        utsettelse
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
