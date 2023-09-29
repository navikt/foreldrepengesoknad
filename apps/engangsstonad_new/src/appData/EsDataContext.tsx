import { createContext, useReducer, FunctionComponent, ReactNode, useContext, useCallback } from 'react';
import { OmBarnet } from 'types/OmBarnet';
import { Søkersituasjon } from 'types/Søkersituasjon';
import { Utenlandsopphold, UtenlandsoppholdNeste, UtenlandsoppholdSiste } from 'types/Utenlandsopphold';

export enum EsDataType {
    SØKERSITUASJON = 'SØKERSITUASJON',
    OM_BARNET = 'OM_BARNET',
    UTENLANDSOPPHOLD = 'UTENLANDSOPPHOLD',
    UTENLANDSOPPHOLD_NESTE = 'UTENLANDSOPPHOLD_NESTE',
    UTENLANDSOPPHOLD_SISTE = 'UTENLANDSOPPHOLD_SISTE',
}

export type EsDataMap = {
    [EsDataType.SØKERSITUASJON]?: Søkersituasjon;
    [EsDataType.OM_BARNET]?: OmBarnet;
    [EsDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [EsDataType.UTENLANDSOPPHOLD_NESTE]?: UtenlandsoppholdNeste;
    [EsDataType.UTENLANDSOPPHOLD_SISTE]?: UtenlandsoppholdSiste;
};

const defaultInitialState = {} as EsDataMap;

type Action = { type: 'update'; key: EsDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = EsDataMap;

const EsStateContext = createContext<State>(defaultInitialState);
const EsDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: EsDataMap;
}

export const EsDataContext: FunctionComponent<OwnProps> = ({ children, initialState }): JSX.Element => {
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

    return (
        <EsStateContext.Provider value={state}>
            <EsDispatchContext.Provider value={dispatch}>{children}</EsDispatchContext.Provider>
        </EsStateContext.Provider>
    );
};

/** Hook returns save function for one particular data type */
export const useEsStateSaveFn = <TYPE extends EsDataType>(key: TYPE): ((data: EsDataMap[TYPE]) => void) => {
    const dispatch = useContext(EsDispatchContext);
    return useCallback((data: EsDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    }, []);
};

/** Hook returns save function usable with all data types  */
export const useAllStateSaveFn = () => {
    const dispatch = useContext(EsDispatchContext);
    return useCallback(<TYPE extends EsDataType>(key: TYPE, data: EsDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    }, []);
};

/** Hook returns state reset function  */
export const useEsStateResetFn = () => {
    const dispatch = useContext(EsDispatchContext);
    return useCallback(() => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    }, []);
};

/** Hook returns data for one particular data type  */
export const useEsStateData = <TYPE extends EsDataType>(key: TYPE): EsDataMap[TYPE] => {
    const state = useContext(EsStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useEsStateAllDataFn = () => {
    const state = useContext(EsStateContext);

    return useCallback(<TYPE extends EsDataType>(key: TYPE) => {
        return state[key];
    }, []);
};
