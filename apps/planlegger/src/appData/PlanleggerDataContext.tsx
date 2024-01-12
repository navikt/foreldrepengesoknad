import { createContext, useReducer, FunctionComponent, ReactNode, useContext, useCallback } from 'react';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { Barnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Periode } from 'types/Periode';
import { Søkersituasjon } from 'types/Søkersituasjon';

export enum ContextDataType {
    HVEM_PLANLEGGER = 'HVEM_PLANLEGGER',
    SØKERSITUASJON = 'SØKERSITUASJON',
    OM_BARNET = 'OM_BARNET',
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    PERIODE = 'PERIODE',
}

export type ContextDataMap = {
    [ContextDataType.HVEM_PLANLEGGER]?: HvemPlanlegger;
    [ContextDataType.SØKERSITUASJON]?: Søkersituasjon;
    [ContextDataType.OM_BARNET]?: Barnet;
    [ContextDataType.ARBEIDSSITUASJON]?: Arbeidssituasjon;
    [ContextDataType.PERIODE]?: Periode;
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
    testDispatcher?: (action: Action) => void;
}

export const PlanleggerDataContext: FunctionComponent<OwnProps> = ({
    children,
    initialState,
    testDispatcher,
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

    const dispatchWrapper = useCallback((a: Action) => {
        if (testDispatcher) {
            testDispatcher(a);
        }
        dispatch(a);
    }, []);

    return (
        <PlanleggerStateContext.Provider value={state}>
            <PlanleggerDispatchContext.Provider value={dispatchWrapper}>{children}</PlanleggerDispatchContext.Provider>
        </PlanleggerStateContext.Provider>
    );
};

/** Hook returns save function for one specific data type */
export const useContextSaveData = <TYPE extends ContextDataType>(key: TYPE): ((data: ContextDataMap[TYPE]) => void) => {
    const dispatch = useContext(PlanleggerDispatchContext);
    return useCallback((data: ContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    }, []);
};

/** Hook returns save function usable with all data types  */
export const useContextSaveAnyData = () => {
    const dispatch = useContext(PlanleggerDispatchContext);
    return useCallback(<TYPE extends ContextDataType>(key: TYPE, data: ContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    }, []);
};

/** Hook returns state reset function  */
export const useContextReset = () => {
    const dispatch = useContext(PlanleggerDispatchContext);
    return useCallback(() => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    }, []);
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] => {
    const state = useContext(PlanleggerStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useContextGetAnyData = () => {
    const state = useContext(PlanleggerStateContext);

    return useCallback(<TYPE extends ContextDataType>(key: TYPE) => {
        return state[key];
    }, []);
};
