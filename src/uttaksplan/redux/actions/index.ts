import {
    Dekningsgrad,
    Periodetype,
    Periode,
    Permisjonsregler
} from '../../types';

import { PlanleggerActionTypes, PlanleggerActionTypeKeys } from './actionTypes';
import { Søker } from 'app/types/søknad/Søker';
import AnnenForelder from 'app/types/søknad/AnnenForelder';
import Person from 'app/types/Person';

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
    bruker: Person,
    søker: Søker,
    annenForelder: AnnenForelder,
    fellesukerForelder1: number,
    fellesukerForelder2: number,
    permisjonsregler: Permisjonsregler
): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.OPPRETT_PERIODER,
        termindato,
        dekningsgrad,
        bruker,
        søker,
        annenForelder,
        fellesukerForelder1,
        fellesukerForelder2,
        permisjonsregler
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

export function dev(key: string): PlanleggerActionTypes {
    return {
        type: PlanleggerActionTypeKeys.DEV_ACTION,
        key
    };
}
