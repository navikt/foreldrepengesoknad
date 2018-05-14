import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import { getPermisjonsregler } from '../../data/permisjonsregler';
import { UttaksplanFormState } from '../types';
import { normaliserDato } from '../../utils';
import { FellesperiodeFordeling, Dekningsgrad } from '../../types';
import { getAntallUkerFellesperiode } from '../../utils/permisjonUtils';
import { addYears, isWithinRange } from 'date-fns';

const getDefaultState = (
    dato: Date,
    dekningsgrad: Dekningsgrad
): UttaksplanFormState => {
    const permisjonsregler = getPermisjonsregler(dato);
    const ukerFellesperiode = getAntallUkerFellesperiode(
        permisjonsregler,
        dekningsgrad
    );
    const ukerForelder1 = Math.round(ukerFellesperiode / 2);
    const ukerForelder2 = ukerFellesperiode - ukerForelder1;

    return {
        termindato: dato,
        navnForelder1: undefined,
        navnForelder2: undefined,
        dekningsgrad: undefined,
        ukerFellesperiode,
        fellesperiodeukerForelder1: ukerForelder1,
        fellesperiodeukerForelder2: ukerForelder2,
        permisjonsregler
    };
};

const getInitialState = (): UttaksplanFormState => {
    const permisjonsregler = getPermisjonsregler(new Date());
    const ukerFellesperiode = getAntallUkerFellesperiode(
        permisjonsregler,
        '100%'
    );
    const ukerForelder1 = Math.round(ukerFellesperiode / 2);
    const ukerForelder2 = ukerFellesperiode - ukerForelder1;

    return {
        termindato: undefined,
        navnForelder1: undefined,
        navnForelder2: undefined,
        dekningsgrad: undefined,
        ukerFellesperiode,
        fellesperiodeukerForelder1: ukerForelder1,
        fellesperiodeukerForelder2: ukerForelder2,
        permisjonsregler
    };
};

const beregnUkerForelder2 = (
    ukerFellesperiode: number | undefined,
    ukerForelder1: number | undefined
): number => (ukerFellesperiode ? ukerFellesperiode - (ukerForelder1 || 0) : 0);

export const refordelFellesperiode = (
    ukerFellesperiode: number,
    nesteUkerFellesperiode: number,
    ukerForelder1: number
): FellesperiodeFordeling => {
    const diff = (nesteUkerFellesperiode - (ukerFellesperiode || 0)) / 2;
    const nyUkerForelder1 = Math.max(ukerForelder1 + diff, 0);
    return {
        ukerForelder1: nyUkerForelder1,
        ukerForelder2: beregnUkerForelder2(
            nesteUkerFellesperiode,
            nyUkerForelder1
        )
    };
};

const validerTermindato = (termindato: Date) => {
    return (
        termindato &&
        isWithinRange(
            termindato,
            addYears(new Date(), -1),
            addYears(new Date(), 2)
        )
    );
};

const FormReducer = (
    state = getInitialState(),
    action: PlanleggerActionTypes
): UttaksplanFormState => {
    switch (action.type) {
        case PlanleggerActionTypeKeys.SET_NAVN_FORELDER1:
            return { ...state, navnForelder1: action.navn };
        case PlanleggerActionTypeKeys.SET_NAVN_FORELDER2:
            return { ...state, navnForelder2: action.navn };
        case PlanleggerActionTypeKeys.SET_TERMINDATO:
            const dato = normaliserDato(action.termindato);
            const permisjonsregler = getPermisjonsregler(dato);
            const erGyldigTermindato = validerTermindato(dato);
            if (erGyldigTermindato) {
                return {
                    ...getDefaultState(dato, state.dekningsgrad || '100%'),
                    navnForelder1: state.navnForelder1,
                    navnForelder2: state.navnForelder2,
                    termindato: dato,
                    permisjonsregler
                };
            } else {
                return {
                    ...state,
                    termindatoErUgyldig: true
                };
            }
        case PlanleggerActionTypeKeys.SET_DEKNINGSGRAD:
            if (!action.dekningsgrad) {
                return state;
            }
            const pstForelder1 =
                100 /
                state.ukerFellesperiode *
                state.fellesperiodeukerForelder1;
            const ukerFellesperiode = getAntallUkerFellesperiode(
                state.permisjonsregler,
                action.dekningsgrad
            );
            const fellesperiodeukerForelder1 = Math.round(
                ukerFellesperiode / 100 * pstForelder1
            );
            const fellesperiodeukerForelder2 =
                ukerFellesperiode - fellesperiodeukerForelder1;
            return {
                ...state,
                dekningsgrad: action.dekningsgrad,
                ukerFellesperiode,
                fellesperiodeukerForelder1,
                fellesperiodeukerForelder2
            };
        case PlanleggerActionTypeKeys.SET_UKER_FORELDER1:
            return {
                ...state,
                fellesperiodeukerForelder1: action.uker,
                fellesperiodeukerForelder2: beregnUkerForelder2(
                    state.ukerFellesperiode,
                    action.uker
                )
            };
        default:
            return state;
    }
};

export default FormReducer;
