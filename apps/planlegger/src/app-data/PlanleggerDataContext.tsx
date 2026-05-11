import { JSX, ReactNode, createContext, use, useCallback, useReducer } from 'react';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorMye } from 'types/HvorMye';

import {
    FordelingPlanlegger,
    HvorLangPeriodePlanlegger,
    OmBarnetPlanlegger,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

export enum ContextDataType {
    HVEM_PLANLEGGER = 'HVEM_PLANLEGGER',
    OM_BARNET = 'OM_BARNET',
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    HVOR_LANG_PERIODE = 'HVOR_LANG_PERIODE',
    FORDELING = 'FORDELING',
    HVOR_MYE = 'HVOR_MYE',
    UTTAKSPLAN = 'UTTAKSPLAN',
}

export type ContextDataMap = {
    [ContextDataType.HVEM_PLANLEGGER]?: HvemPlanlegger;
    [ContextDataType.OM_BARNET]?: OmBarnetPlanlegger;
    [ContextDataType.ARBEIDSSITUASJON]?: Arbeidssituasjon;
    [ContextDataType.HVOR_MYE]?: HvorMye;
    [ContextDataType.HVOR_LANG_PERIODE]?: HvorLangPeriodePlanlegger;
    [ContextDataType.FORDELING]?: FordelingPlanlegger;
    [ContextDataType.UTTAKSPLAN]?: UttakPeriode_fpoversikt[];
};

const defaultInitialState: ContextDataMap = {};

export type Action =
    | { type: 'update'; key: ContextDataType; data: ContextDataMap[keyof ContextDataMap] }
    | { type: 'reset' };
type Dispatch = (action: Action) => void;

const PlanleggerStateContext = createContext<ContextDataMap>(defaultInitialState);
const PlanleggerDispatchContext = createContext<Dispatch | undefined>(undefined);

interface Props {
    children: ReactNode;
    initialState?: ContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const PlanleggerDataContext = ({ children, initialState, onDispatch }: Props): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: ContextDataMap, action: Action) => {
        switch (action.type) {
            case 'update':
                return {
                    ...oldState,
                    [action.key]: action.data,
                };
            case 'reset':
                return {};
            default:
                throw new Error();
        }
    }, initialState || defaultInitialState);

    const dispatchWrapper = useCallback(
        (a: Action) => {
            if (onDispatch) {
                onDispatch(a);
            }
            dispatch(a);
        },
        [onDispatch],
    );

    return (
        <PlanleggerStateContext value={state}>
            <PlanleggerDispatchContext value={dispatchWrapper}>{children}</PlanleggerDispatchContext>
        </PlanleggerStateContext>
    );
};

/** Hook returns save function for one specific data type */
export const useContextSaveData = <TYPE extends ContextDataType>(key: TYPE): ((data: ContextDataMap[TYPE]) => void) => {
    const dispatch = use(PlanleggerDispatchContext);
    return useCallback(
        (data: ContextDataMap[TYPE]) => {
            if (dispatch) {
                dispatch({ type: 'update', key, data });
            }
        },
        [dispatch, key],
    );
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] => {
    const state = use(PlanleggerStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useContextGetAnyData = () => {
    const state = use(PlanleggerStateContext);

    return useCallback(
        <TYPE extends ContextDataType>(key: TYPE) => {
            return state[key];
        },
        [state],
    );
};

export const useContextComplete = () => {
    return use(PlanleggerStateContext);
};
