import { createContext, useReducer, FunctionComponent, ReactNode, useContext, useCallback } from 'react';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { Barnehageplass } from 'types/Barnehageplass';
import { Barnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Periode } from 'types/Periode';
import { Søkersituasjon } from 'types/Søkersituasjon';

export enum PlanleggerDataType {
    HVEM_PLANLEGGER = 'HVEM_PLANLEGGER',
    SØKERSITUASJON = 'SØKERSITUASJON',
    OM_BARNET = 'OM_BARNET',
    BARNEHAGEPLASS = 'BARNEHAGEPLASS',
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    PERIODE = 'PERIODE',
}

export type PlanleggerDataMap = {
    [PlanleggerDataType.HVEM_PLANLEGGER]?: HvemPlanlegger;
    [PlanleggerDataType.SØKERSITUASJON]?: Søkersituasjon;
    [PlanleggerDataType.OM_BARNET]?: Barnet;
    [PlanleggerDataType.BARNEHAGEPLASS]?: Barnehageplass;
    [PlanleggerDataType.ARBEIDSSITUASJON]?: Arbeidssituasjon;
    [PlanleggerDataType.PERIODE]?: Periode;
};

const defaultInitialState = {} as PlanleggerDataMap;

export type Action = { type: 'update'; key: PlanleggerDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = PlanleggerDataMap;

const PlanleggerStateContext = createContext<State>(defaultInitialState);
const PlanleggerDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: PlanleggerDataMap;
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
export const usePlanleggerStateSaveFn = <TYPE extends PlanleggerDataType>(
    key: TYPE,
): ((data: PlanleggerDataMap[TYPE]) => void) => {
    const dispatch = useContext(PlanleggerDispatchContext);
    return useCallback((data: PlanleggerDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    }, []);
};

/** Hook returns save function usable with all data types  */
export const useAllStateSaveFn = () => {
    const dispatch = useContext(PlanleggerDispatchContext);
    return useCallback(<TYPE extends PlanleggerDataType>(key: TYPE, data: PlanleggerDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    }, []);
};

/** Hook returns state reset function  */
export const useEsStateResetFn = () => {
    const dispatch = useContext(PlanleggerDispatchContext);
    return useCallback(() => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    }, []);
};

/** Hook returns data for one specific data type  */
export const useEsStateData = <TYPE extends PlanleggerDataType>(key: TYPE): PlanleggerDataMap[TYPE] => {
    const state = useContext(PlanleggerStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useEsStateAllDataFn = () => {
    const state = useContext(PlanleggerStateContext);

    return useCallback(<TYPE extends PlanleggerDataType>(key: TYPE) => {
        return state[key];
    }, []);
};
