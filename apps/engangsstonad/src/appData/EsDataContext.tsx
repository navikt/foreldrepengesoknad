import { Søkersituasjon, Utenlandsopphold, UtenlandsoppholdSenere, UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { createContext, useReducer, FunctionComponent, ReactNode, useContext, useCallback } from 'react';
import Dokumentasjon from 'types/Dokumentasjon';
import { OmBarnet } from 'types/OmBarnet';
import { Path } from './paths';

export enum ContextDataType {
    CURRENT_PATH = 'CURRENT_PATH',
    SØKERSITUASJON = 'SØKERSITUASJON',
    OM_BARNET = 'OM_BARNET',
    DOKUMENTASJON = 'DOKUMENTASJON',
    UTENLANDSOPPHOLD = 'UTENLANDSOPPHOLD',
    UTENLANDSOPPHOLD_SENERE = 'UTENLANDSOPPHOLD_SENERE',
    UTENLANDSOPPHOLD_TIDLIGERE = 'UTENLANDSOPPHOLD_TIDLIGERE',
}

export type ContextDataMap = {
    [ContextDataType.CURRENT_PATH]?: Path;
    [ContextDataType.SØKERSITUASJON]?: Søkersituasjon;
    [ContextDataType.OM_BARNET]?: OmBarnet;
    [ContextDataType.DOKUMENTASJON]?: Dokumentasjon;
    [ContextDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: UtenlandsoppholdSenere;
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: UtenlandsoppholdTidligere;
};

const defaultInitialState = {} as ContextDataMap;

export type Action = { type: 'update'; key: ContextDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = ContextDataMap;

const EsStateContext = createContext<State>(defaultInitialState);
const EsDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: ContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const EsDataContext: FunctionComponent<OwnProps> = ({ children, initialState, onDispatch }): JSX.Element => {
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
        <EsStateContext.Provider value={state}>
            <EsDispatchContext.Provider value={dispatchWrapper}>{children}</EsDispatchContext.Provider>
        </EsStateContext.Provider>
    );
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] => {
    const state = useContext(EsStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useContextGetAnyData = () => {
    const state = useContext(EsStateContext);

    return useCallback(
        <TYPE extends ContextDataType>(key: TYPE) => {
            return state[key];
        },
        [state],
    );
};

/** Hook returns save function for one specific data type */
export const useContextSaveData = <TYPE extends ContextDataType>(key: TYPE): ((data: ContextDataMap[TYPE]) => void) => {
    const dispatch = useContext(EsDispatchContext);
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
    const dispatch = useContext(EsDispatchContext);
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
    const dispatch = useContext(EsDispatchContext);
    return useCallback(() => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    }, [dispatch]);
};

/** Hook returns state  */
export const useContextComplete = (): ContextDataMap => {
    return useContext(EsStateContext);
};
