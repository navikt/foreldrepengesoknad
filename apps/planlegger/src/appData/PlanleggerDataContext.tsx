import { FunctionComponent, ReactNode, createContext, useCallback, useContext, useReducer } from 'react';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { Søkersituasjon } from 'types/Søkersituasjon';

export enum ContextDataType {
    HVEM_PLANLEGGER = 'HVEM_PLANLEGGER',
    SØKERSITUASJON = 'SØKERSITUASJON',
    OM_BARNET = 'OM_BARNET',
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    HVOR_LANG_PERIODE = 'HVOR_LANG_PERIODE',
    FORDELING = 'FORDELING',
}

export type ContextDataMap = {
    [ContextDataType.HVEM_PLANLEGGER]?: HvemPlanlegger;
    [ContextDataType.SØKERSITUASJON]?: Søkersituasjon;
    [ContextDataType.OM_BARNET]?: OmBarnet;
    [ContextDataType.ARBEIDSSITUASJON]?: Arbeidssituasjon;
    [ContextDataType.HVOR_LANG_PERIODE]?: HvorLangPeriode;
    [ContextDataType.FORDELING]?: Fordeling;
};

const defaultInitialState = {} as ContextDataMap;

export type Action = { type: 'update'; key: ContextDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = ContextDataMap;

const PlanleggerStateContext = createContext<State>(defaultInitialState);
const PlanleggerDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: ContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const PlanleggerDataContext: FunctionComponent<OwnProps> = ({
    children,
    initialState,
    onDispatch,
}): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: State, action: Action) => {
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
        <PlanleggerStateContext.Provider value={state}>
            <PlanleggerDispatchContext.Provider value={dispatchWrapper}>{children}</PlanleggerDispatchContext.Provider>
        </PlanleggerStateContext.Provider>
    );
};

/** Hook returns save function for one specific data type */
export const useContextSaveData = <TYPE extends ContextDataType>(key: TYPE): ((data: ContextDataMap[TYPE]) => void) => {
    const dispatch = useContext(PlanleggerDispatchContext);
    return useCallback(
        (data: ContextDataMap[TYPE]) => {
            if (dispatch) {
                dispatch({ type: 'update', key, data });
            }
        },
        [dispatch, key],
    );
};

/** Hook returns save function usable with all data types  */
export const useContextSaveAnyData = () => {
    const dispatch = useContext(PlanleggerDispatchContext);
    return useCallback(
        <TYPE extends ContextDataType>(key: TYPE, data: ContextDataMap[TYPE]) => {
            if (dispatch) {
                dispatch({ type: 'update', key, data });
            }
        },
        [dispatch],
    );
};

/** Hook returns state reset function  */
export const useContextReset = () => {
    const dispatch = useContext(PlanleggerDispatchContext);
    return useCallback(() => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    }, [dispatch]);
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] => {
    const state = useContext(PlanleggerStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useContextGetAnyData = () => {
    const state = useContext(PlanleggerStateContext);

    return useCallback(
        <TYPE extends ContextDataType>(key: TYPE) => {
            return state[key];
        },
        [state],
    );
};

export const useContextComplete = () => {
    return useContext(PlanleggerStateContext);
};
